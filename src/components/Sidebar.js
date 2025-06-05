export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#1F2937] text-white min-h-screen shadow-md">
      <div className="text-xl font-bold p-4 border-b border-gray-700">ACAMIS</div>
      <nav className="p-4 space-y-2 text-sm">
        <div className="font-semibold text-gray-400">ATTENDANCE</div>
        <ul className="space-y-1">
          {["Daily Attendance", "Monthly Report", "Summary Report", "All Semesters Report"].map((item) => (
            <li key={item} className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 text-gray-400 font-semibold">STUDENTS</div>
        <ul>
          <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer">Students</li>
          <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer">Batch</li>
        </ul>
        <div className="mt-6 text-gray-400 font-semibold">SETTINGS</div>
        <ul>
          <li className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer">Settings</li>
        </ul>
      </nav>
    </aside>
  );
}
