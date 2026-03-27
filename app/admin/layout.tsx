import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-6 text-white">
                {children}
            </main>
        </div>
    );
}
