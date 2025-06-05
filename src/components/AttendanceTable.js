import StudentRow from "./StudentRow";

export default function AttendanceTable({ students, updateStatus, selectedDate }) {
  return (
    <table className="w-full text-sm table-auto">
      <thead>
        <tr className="bg-gray-100 text-gray-700 text-left">
          <th className="p-2">#</th>
          <th className="p-2">Student Name</th>
          <th className="p-2 text-center">Status</th>
          <th className="p-2 text-center">Previous 7 Days</th>
          <th className="p-2 text-center">Absent Days</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, idx) => (
          <StudentRow
            key={student.id}
            student={student}
            index={idx}
            updateStatus={updateStatus}
            selectedDate={selectedDate} // ✅ Pass this prop!
          />
        ))}
      </tbody>
    </table>
  );
}
