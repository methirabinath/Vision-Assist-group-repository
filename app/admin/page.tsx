"use client";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/config";

interface User {
    _id: string;
    role: string;
}

export default function AdminDashboard() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [totalUsers, setTotalUsers] = useState(0);
    const [caregiverCount, setCaregiverCount] = useState(0);
    const [blindUserCount, setBlindUserCount] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {

            const token = localStorage.getItem("admin_token");

            const res = await fetch(`${BASE_URL}/api/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) throw new Error("Failed to fetch users");

            const data = await res.json();

            const userList = data.users || [];

            setUsers(userList);

            // Statistics Calculation
            setTotalUsers(userList.length);

            setCaregiverCount(
                userList.filter((u: User) => u.role === "caregiver").length
            );

            setBlindUserCount(
                userList.filter((u: User) => u.role === "blindUser").length
            );

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 min-h-screen bg-gray-50">

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Admin Dashboard
            </h1>

            <p className="text-gray-500 mb-8">
                Welcome to VisionAssist Admin Panel
            </p>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                    <h3 className="text-gray-500 text-sm">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                        {loading ? "..." : totalUsers}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                    <h3 className="text-gray-500 text-sm">Caregivers</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                        {loading ? "..." : caregiverCount}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
                    <h3 className="text-gray-500 text-sm">Blind Users</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">
                        {loading ? "..." : blindUserCount}
                    </p>
                </div>

            </div>
        </div>
    );
}