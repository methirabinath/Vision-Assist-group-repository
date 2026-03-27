"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config";
import toast, { Toaster } from "react-hot-toast";

// Dynamically import the Fedora icon to avoid SSR hydration issues
const FedoraIcon = dynamic(
    () => import("react-icons/gi").then((mod) => mod.GiFedora),
    { ssr: false }
);

export default function VisionAssistAdminLogin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${BASE_URL}/api/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Login failed");
                return;
            }

            if (data.token) {
                localStorage.setItem("admin_token", data.token);
            }

            toast.success("Login successful!");
            router.push("/admin");
        } catch (error) {
            console.error(error);
            toast.error("Login error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Toast container */}
            <Toaster position="top-right" reverseOrder={false} />

            {/* Left Side - Branding */}
            <div className="w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-10">
                <FedoraIcon className="text-6xl mb-4" />
                <h1 className="text-4xl font-bold">VisionAssist Admin</h1>
                <p className="mt-2 text-lg">Manage your platform efficiently</p>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-1/2 flex items-center justify-center p-10 bg-gray-50">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Admin Login</h2>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full pl-3 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full pl-3 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? "Signing In..." : "Sign In to Dashboard"}
                        </button>

                        {/* Small Sign Up Link */}
                        <div className="text-center mt-5">
                            <p className="text-sm text-gray-500">
                                Don't have an admin account?{" "}
                                <a
                                    href="/register"
                                    className="text-blue-600 font-semibold hover:text-blue-700 transition"
                                >
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Need help?{" "}
                            <a
                                href="/support"
                                className="font-semibold text-blue-600 hover:text-blue-700 transition"
                            >
                                Contact Support
                            </a>
                        </p>
                        <p className="text-xs text-gray-500 mt-3">
                            © 2026 VisionAssist. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}