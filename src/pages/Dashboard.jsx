import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaEdit, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  // Blogs state
  const [blogs, setBlogs] = useState([
    { id: 1, title: "First Blog", author: "Admin", content: "Content for first blog" },
    { id: 2, title: "Second Blog", author: "Admin", content: "Content for second blog" },
    { id: 3, title: "Third Blog", author: "Admin", content: "Content for third blog" },
    { id: 4, title: "Fourth Blog", author: "Admin", content: "Content for fourth blog" },
    { id: 5, title: "Fifth Blog", author: "Admin", content: "Content for fifth blog" },
  ]);

  // Search state
  const [search, setSearch] = useState("");

  // Filter blogs based on search
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />

        <main className="p-6 flex-1">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <h3 className="text-gray-500 text-sm">Total Blogs</h3>
              <span className="text-3xl font-bold">{blogs.length}</span>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <h3 className="text-gray-500 text-sm">Total Authors</h3>
              <span className="text-3xl font-bold">1</span>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <h3 className="text-gray-500 text-sm">Recent Activity</h3>
              <span className="text-3xl font-bold">{blogs.length}</span>
            </div>
          </div>

      
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
