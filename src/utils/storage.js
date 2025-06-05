export const getStudents = () => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("students");
  return data ? JSON.parse(data) : [];
};

export const saveStudents = (students) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("students", JSON.stringify(students));
  }
};

