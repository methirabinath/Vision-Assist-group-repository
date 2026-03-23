"use client";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/config";

interface User {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    isApproved?: boolean;
}

export default function UserManagement() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {

            const token = localStorage.getItem("admin_token");

            const res = await fetch(`${BASE_URL}/api/admin/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            console.log("Users fetched:", data);

            // ✅ UPDATE STATE HERE (MOST IMPORTANT PART)
            setUsers(data.users || []);

        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false); // ✅ stop loading UI
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">
                Users Management
            </h1>

            <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-gray-700">Full Name</th>
                            <th className="py-3 px-4 text-left text-gray-700">Email</th>
                            <th className="py-3 px-4 text-left text-gray-700">Phone</th>
                            <th className="py-3 px-4 text-left text-gray-700">Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    Loading users...
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user._id} className="border-t hover:bg-green-100 transition">
                                    <td className="py-3 px-4 text-gray-900 font-medium">{user.fullName}</td>
                                    <td className="py-3 px-4 text-gray-700">{user.email}</td>
                                    <td className="py-3 px-4 text-gray-700">{user.phone}</td>
                                    <td className="py-3 px-4 text-gray-800 capitalize">{user.role}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}