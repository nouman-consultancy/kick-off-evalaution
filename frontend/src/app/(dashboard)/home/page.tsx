export default function DashboardHomePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard Home</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">Active Sessions</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">567</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">$12,345</p>
        </div>
      </div>
    </div>
  );
}