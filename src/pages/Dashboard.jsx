import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaBars, FaEdit, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-50 transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay (for mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header with mobile menu */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b sticky top-0 z-40">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-purple-600"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={22} />
          </button>

          {/* Page Header */}
          <Header />
        </div>

        {/* Main Page Content */}
        <main className="p-6 flex-1">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <h3 className="text-gray-500 text-sm">Total Blogs</h3>
              <span className="text-3xl font-bold">20</span>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <h3 className="text-gray-500 text-sm">Total Authors</h3>
              <span className="text-3xl font-bold">1</span>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <h3 className="text-gray-500 text-sm">Recent Activity</h3>
              <span className="text-3xl font-bold">20</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
