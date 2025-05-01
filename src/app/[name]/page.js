"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [firstNameInput, setFirstNameInput] = useState(""); // State for input
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [lastNames, setLastNames] = useState([]); // State for storing list of last names

  // Fetch all last names from the database
  const fetchLastNames = async () => {
    try {
      const res = await fetch("/api/saveLastName");
      if (res.ok) {
        const data = await res.json();
        setLastNames(data.users); // Assuming the response contains 'users' array
      } else {
        console.error("Failed to fetch last names");
      }
    } catch (error) {
      console.error("Error fetching last names:", error);
    }
  };

  // Handle form submission to save a last name
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstNameInput.trim()) return;

    try {
      const res = await fetch("/api/saveLastName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastName: firstNameInput }), // Sending lastName
      });

      if (res.ok) {
        setFirstNameInput(""); // Clear input after submit
        setSuccessMessage("Last name saved successfully!"); // Show success message
        fetchLastNames(); // Refresh the list after submitting
      } else {
        console.error("Failed to save last name");
        setSuccessMessage(""); // Clear any existing success message
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage(""); // Clear any existing success message
    }
  };

  // Handle delete action
  const handleDelete = async (lastName) => {
    try {
      const res = await fetch("/api/saveLastName", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastName }), // Ensure the body contains the lastName
      });

      if (res.ok) {
        // Optionally, refresh the list of last names after successful deletion
        setSuccessMessage("Last name deleted successfully!"); // Show success message
        fetchLastNames(); // Refresh the list of last names
      } else {
        console.error("Failed to delete last name");
        setSuccessMessage(""); // Clear any existing success message
      }
    } catch (error) {
      console.error("Error deleting last name:", error);
      setSuccessMessage(""); // Clear any existing success message
    }
  };

  // Fetch the list of last names when the component mounts
  useEffect(() => {
    fetchLastNames();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Last Name</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={firstNameInput}
            onChange={(e) => setFirstNameInput(e.target.value)}
            placeholder="Enter last name"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Create
          </button>
        </form>

        {/* Show success message after last name is saved */}
        {successMessage && (
          <p className="mt-4 text-green-500 text-center">{successMessage}</p>
        )}

        {/* Display the list of existing last names */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Existing Last Names:</h2>
          <div className="space-y-2">
            {lastNames.length > 0 ? (
              lastNames.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <Link href={`/${user.lastName}`} className="text-blue-600">{user.lastName}</Link>
                  <button
                    onClick={() => handleDelete(user.lastName)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No last names yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
