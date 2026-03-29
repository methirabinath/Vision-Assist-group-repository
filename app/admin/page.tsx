"use client";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/config";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    isActive?: boolean;
}

function AnimatedNumber({ value, loading }: { value: number; loading: boolean }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (loading) return;
        let start = 0;
        const duration = 800;
        const step = Math.ceil(value / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= value) {
                setDisplay(value);
                clearInterval(timer);
            } else {
                setDisplay(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [value, loading]);

    return <span>{loading ? "—" : display}</span>;
}

function RoleBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">{label}</span>
                <span className="text-slate-700 font-semibold">{count} <span className="text-slate-400 font-normal">({pct}%)</span></span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        fetchUsers();
        const tick = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(tick);
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`${BASE_URL}/api/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data.users || []);
        } catch (err) {
            console.error(err);
            setError("Could not load user data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const totalUsers = users.length;
    const caregiverCount = users.filter((u) => u.role === "caregiver").length;
    const blindUserCount = users.filter((u) => u.role === "blindUser").length;
    const activeCount = users.filter((u) => u.isActive !== false).length;

    // Last 5 joined users
    const recentUsers = [...users]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    const greeting = () => {
        const h = currentTime.getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    };

    const timeStr = currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const dateStr = currentTime.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
                .dash-root { font-family: 'DM Sans', sans-serif; }
                .mono { font-family: 'DM Mono', monospace; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-up { animation: fadeUp 0.4s ease both; }
                .fade-up-1 { animation-delay: 0.05s; }
                .fade-up-2 { animation-delay: 0.12s; }
                .fade-up-3 { animation-delay: 0.19s; }
                .fade-up-4 { animation-delay: 0.26s; }
                .fade-up-5 { animation-delay: 0.33s; }
            `}</style>

            <div className="dash-root p-6 md:p-8 max-w-7xl mx-auto space-y-6">

                {/* ── Header ── */}
                <div className="fade-up flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-medium mb-1">VisionAssist · Admin Panel</p>
                        <h1 className="text-2xl font-bold text-slate-800">{greeting()} 👋</h1>
                        <p className="text-sm text-slate-500 mt-0.5">{dateStr}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm self-start sm:self-auto">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="mono text-sm text-slate-600 font-medium">{timeStr}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-xs text-slate-400">Live</span>
                    </div>
                </div>

                {/* ── Error Banner ── */}
                {error && (
                    <div className="fade-up bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-5.25a.75.75 0 001.5 0V8.75a.75.75 0 00-1.5 0v4zm.75-6.5a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* ── Stat Cards ── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            label: "Total Users",
                            value: totalUsers,
                            icon: (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z" />
                                </svg>
                            ),
                            accent: "bg-blue-500",
                            light: "bg-blue-50 text-blue-600",
                            textColor: "text-blue-600",
                            delay: "fade-up-1",
                        },
                        {
                            label: "Caregivers",
                            value: caregiverCount,
                            icon: (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                                </svg>
                            ),
                            accent: "bg-emerald-500",
                            light: "bg-emerald-50 text-emerald-600",
                            textColor: "text-emerald-600",
                            delay: "fade-up-2",
                        },
                        {
                            label: "Blind Users",
                            value: blindUserCount,
                            icon: (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 1.657-4.03 6-9 6S3 13.657 3 12 7.03 6 12 6s9 4.343 9 6z" />
                                </svg>
                            ),
                            accent: "bg-violet-500",
                            light: "bg-violet-50 text-violet-600",
                            textColor: "text-violet-600",
                            delay: "fade-up-3",
                        },
                        {
                            label: "Active Users",
                            value: activeCount,
                            icon: (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ),
                            accent: "bg-amber-500",
                            light: "bg-amber-50 text-amber-600",
                            textColor: "text-amber-600",
                            delay: "fade-up-4",
                        },
                    ].map((card) => (
                        <div
                            key={card.label}
                            className={`fade-up ${card.delay} bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium">{card.label}</span>
                                <span className={`${card.light} p-1.5 rounded-lg`}>{card.icon}</span>
                            </div>
                            <p className={`text-4xl font-bold ${card.textColor} mono`}>
                                <AnimatedNumber value={card.value} loading={loading} />
                            </p>
                            <div className={`h-1 rounded-full ${card.accent} opacity-20`} />
                        </div>
                    ))}
                </div>

                {/* ── Bottom Row ── */}
                <div className="grid lg:grid-cols-5 gap-4">

                    {/* Breakdown */}
                    <div className="fade-up fade-up-4 lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
                        <div>
                            <h2 className="text-sm font-semibold text-slate-700">User Breakdown</h2>
                            <p className="text-xs text-slate-400 mt-0.5">Distribution by role</p>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-3 bg-slate-100 rounded w-1/2 animate-pulse" />
                                        <div className="h-2 bg-slate-100 rounded animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <RoleBar label="Caregivers" count={caregiverCount} total={totalUsers} color="bg-emerald-400" />
                                <RoleBar label="Blind Users" count={blindUserCount} total={totalUsers} color="bg-violet-400" />
                                <RoleBar label="Other" count={totalUsers - caregiverCount - blindUserCount} total={totalUsers} color="bg-slate-300" />
                            </div>
                        )}

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs text-slate-400">Total registered</span>
                            <span className="mono text-sm font-semibold text-slate-700">{loading ? "—" : totalUsers}</span>
                        </div>
                    </div>

                    {/* Recent Users */}
                    <div className="fade-up fade-up-5 lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-700">Recently Joined</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Latest 5 users</p>
                            </div>
                            <a href="/users" className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                                View all →
                            </a>
                        </div>

                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-center gap-3 animate-pulse">
                                        <div className="w-9 h-9 rounded-full bg-slate-100 shrink-0" />
                                        <div className="flex-1 space-y-1.5">
                                            <div className="h-3 bg-slate-100 rounded w-1/3" />
                                            <div className="h-2.5 bg-slate-100 rounded w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : recentUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8z" />
                                </svg>
                                <p className="text-sm">No users yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {recentUsers.map((user) => {
                                    const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "?";
                                    const roleColors: Record<string, string> = {
                                        caregiver: "bg-emerald-100 text-emerald-700",
                                        blindUser: "bg-violet-100 text-violet-700",
                                    };
                                    const avatarColors: Record<string, string> = {
                                        caregiver: "bg-emerald-500",
                                        blindUser: "bg-violet-500",
                                    };
                                    const avatarColor = avatarColors[user.role] ?? "bg-slate-400";
                                    const roleColor = roleColors[user.role] ?? "bg-slate-100 text-slate-600";
                                    const roleLabel = user.role === "blindUser" ? "Blind User" : user.role === "caregiver" ? "Caregiver" : user.role;

                                    return (
                                        <div key={user._id} className="flex items-center gap-3 py-2.5 hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors">
                                            <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                                {initials}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-700 truncate">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${roleColor}`}>
                                                    {roleLabel}
                                                </span>
                                                <span className="text-[10px] text-slate-400 mono hidden sm:block">
                                                    {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}