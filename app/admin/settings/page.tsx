"use client";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/config";
import toast, { Toaster } from "react-hot-toast";

interface Admin {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

const adminInstructions = [
    {
        icon: "👤",
        title: "View Users",
        description: "Browse all registered users from the Users tab. Use filters to search by name, email, or role.",
    },
    {
        icon: "✏️",
        title: "Edit User Details",
        description: "Click on any user row to open their profile. You can update their name, email, or assigned role.",
    },
    {
        icon: "🔒",
        title: "Change User Status",
        description: "Activate or deactivate user accounts using the status toggle. Deactivated users cannot log in.",
    },
    {
        icon: "🗑️",
        title: "Delete a User",
        description: "Open a user's profile and click Delete. This action is permanent and cannot be undone.",
    },
    {
        icon: "🛡️",
        title: "Manage Roles",
        description: "Assign roles such as Admin, Manager, or Viewer to control what each user can access.",
    },
    {
        icon: "📋",
        title: "Export Users",
        description: "Use the Export button on the Users page to download the full user list as a CSV file.",
    },
];

export default function SettingsPage() {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/admin/details`, {
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();
                if (!res.ok) {
                    toast.error(data.message || "Failed to fetch admin details");
                } else {
                    setAdmin(data.admin);
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching admin details");
            } finally {
                setLoading(false);
            }
        };
        fetchAdmin();
    }, []);

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="flex items-center gap-3 text-slate-500">
                    <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Loading settings...
                </div>
            </div>
        );

    if (!admin)
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <p className="text-slate-500">No admin data found.</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-10">
            <Toaster position="top-right" reverseOrder={false} />

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Manage your account details and review admin guidelines.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">

                {/* Admin Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-blue-600 px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold ring-2 ring-white/40">
                                    {admin.firstName.charAt(0)}{admin.lastName.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-base leading-tight">
                                        {admin.firstName} {admin.lastName}
                                    </p>
                                    <span className="inline-block mt-1 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full capitalize">
                                        {admin.role}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="px-6 py-5 space-y-4">
                            {[
                                { label: "Email", value: admin.email, icon: "✉️" },
                                { label: "Member Since", value: new Date(admin.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), icon: "📅" },
                                { label: "Last Updated", value: new Date(admin.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), icon: "🔄" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <span className="text-base mt-0.5">{item.icon}</span>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">{item.label}</p>
                                        <p className="text-sm text-slate-700 font-medium truncate">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Card Footer */}
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                            <p className="text-xs text-slate-400 text-center">Admin ID: <span className="font-mono text-slate-500">{admin._id.slice(-8).toUpperCase()}</span></p>
                        </div>
                    </div>
                </div>

                {/* Admin Instructions Panel */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-slate-800">Admin Guidelines</h2>
                                <p className="text-xs text-slate-400">How to manage users effectively</p>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {adminInstructions.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-colors duration-150"
                                >
                                    <span className="text-xl mt-0.5 shrink-0">{item.icon}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="px-6 pb-5">
                            <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex items-start gap-3">
                                <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
                                </svg>
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    All user management actions are logged. Deletions and role changes are irreversible — proceed with care.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}