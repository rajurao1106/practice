import React from "react";

export default function StudentRow({ student, index, updateStatus, selectedDate }) {
  // Get today's status for selected date
  const todayStatus = student.attendance?.[selectedDate] || "";

  // Generate last 7 days (excluding selected date)
const getPrev7Dates = () => {
  if (!selectedDate || isNaN(new Date(selectedDate).getTime())) {
    return []; // prevent error if date is invalid
  }

  const dates = [];
  for (let i = 7; i >= 1; i--) {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
};


  const prev7Dates = getPrev7Dates();

  const prev7Days = prev7Dates.map((date) => {
    return student.attendance?.[date] === "PRESENT"
      ? "P"
      : student.attendance?.[date] === "ABSENT"
      ? "A"
      : student.attendance?.[date] === "LATE"
      ? "L"
      : "-";
  });

  const absentCount = Object.values(student.attendance || {}).filter(
    (val) => val === "ABSENT"
  ).length;

  return (
    <tr className="border-b">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{student.name}</td>

      <td className="p-2 text-center">
        {["PRESENT", "ABSENT", "LATE"].map((status) => (
          <button
            key={status}
            onClick={() => updateStatus(student.id, status)}
            className={`px-2 py-1 m-1 text-xs rounded ${
              todayStatus === status
                ? status === "PRESENT"
                  ? "bg-green-600 text-white"
                  : status === "ABSENT"
                  ? "bg-red-600 text-white"
                  : "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {status}
          </button>
        ))}
      </td>

      <td className="p-2 text-center space-x-1">
        {prev7Days.map((day, idx) => (
          <span
            key={idx}
            className={`inline-block w-6 h-6 rounded-full text-xs text-white leading-6 ${
              day === "P"
                ? "bg-green-500"
                : day === "A"
                ? "bg-red-500"
                : day === "L"
                ? "bg-yellow-500"
                : "bg-gray-300 text-black"
            }`}
          >
            {day}
          </span>
        ))}
      </td>

      <td className="p-2 text-center">{absentCount}</td>
    </tr>
  );
}
