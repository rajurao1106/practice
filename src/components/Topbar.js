export default function Topbar() {
  return (
    <div className="flex justify-between items-center bg-white p-3 shadow rounded">
      <input
        type="text"
        placeholder="Search students by name or code"
        className="border px-3 py-2 rounded w-1/3 text-sm"
      />
      <div className="flex items-center space-x-4">
        <button className="text-sm text-gray-500">Export Report</button>
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
}
