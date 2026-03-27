export default function UserManagement() {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Users Management</h1>

            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Full Name</th>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Email</th>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Phone</th>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Role</th>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Status</th>
                        <th className="py-3 px-4 border-b text-left text-gray-700">Action</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}
