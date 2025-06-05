"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState("");
  const [selectedDate, setSelectedDate] = useState(() =>
    new Date().toISOString().split("T")[0]
  );

  const storageKey = `attendance-${selectedDate}`;

  useEffect(() => {
    const data = localStorage.getItem(storageKey);
    setStudents(data ? JSON.parse(data) : []);
  }, [selectedDate]);

  const saveStudents = (updated) => {
    setStudents(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const handleAddStudent = () => {
    if (!newName.trim()) return;
    const newStudent = {
      id: uuidv4(),
      name: newName.trim(),
      status: "PRESENT",
    };
    const updated = [...students, newStudent];
    saveStudents(updated);
    setNewName("");
  };

  const updateStatus = (id, status) => {
    const updated = students.map((s) =>
      s.id === id ? { ...s, status } : s
    );
    saveStudents(updated);
  };

  // ✅ Calculate statistics
  const presentCount = students.filter((s) => s.status === "PRESENT").length;
  const absentCount = students.filter((s) => s.status === "ABSENT").length;
  const lateCount = students.filter((s) => s.status === "LATE").length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Student Attendance</h2>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* ✅ Statistics Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 text-green-700 p-3 rounded shadow text-center">
            <div className="text-sm">Present</div>
            <div className="text-xl font-bold">{presentCount}</div>
          </div>
          <div className="bg-red-100 text-red-700 p-3 rounded shadow text-center">
            <div className="text-sm">Absent</div>
            <div className="text-xl font-bold">{absentCount}</div>
          </div>
          <div className="bg-yellow-100 text-yellow-700 p-3 rounded shadow text-center">
            <div className="text-sm">Late</div>
            <div className="text-xl font-bold">{lateCount}</div>
          </div>
        </div>

        {/* Add Student Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter student name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            onClick={handleAddStudent}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Attendance Table */}
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id} className="border-b">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{student.name}</td>
                <td className="p-2 text-center">
                  {["PRESENT", "ABSENT", "LATE"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(student.id, status)}
                      className={`px-2 py-1 m-1 text-xs rounded ${
                        student.status === status
                          ? status === "PRESENT"
                            ? "bg-green-600 text-white"
                            : status === "ABSENT"
                            ? "bg-red-600 text-white"
                            : "bg-yellow-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-400">
                  No students added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
