import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaEdit, FaTrash } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Maria Smith", email: "maria@example.com", role: "User" },
    { id: 3, name: "Alex Johnson", email: "alex@example.com", role: "User" },
    { id: 4, name: "Emma Brown", email: "emma@example.com", role: "Moderator" },
    { id: 5, name: "Michael Lee", email: "michael@example.com", role: "User" },
    { id: 6, name: "Sophia Davis", email: "sophia@example.com", role: "User" },
    { id: 7, name: "David Wilson", email: "david@example.com", role: "Admin" },
    { id: 8, name: "Olivia Taylor", email: "olivia@example.com", role: "User" },
    { id: 9, name: "Daniel Thomas", email: "daniel@example.com", role: "User" },
    { id: 10, name: "Isabella Martinez", email: "isabella@example.com", role: "Moderator" },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Pagination logic
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 flex-1">
          {/* Header + Search */}
            <h2 className="text-2xl font-bold">Users</h2>
             <div className="flex justify-end items-center mt-4 mb-6">

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Users Table */}
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button className="px-2 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg hover:from-purple-500 hover:to-purple-700 transition-all duration-200">
                      <FaEdit />
                    </button>
                    <button className="px-2 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-200">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded transition ${
                  currentPage === i + 1
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
