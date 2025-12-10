import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaBars, FaEdit, FaTrash } from "react-icons/fa";
import { fetchdashboard } from "../Slices/Dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchdashboard());
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Overlay (for mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Section */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 h-screen overflow-hidden">
        {/* Header with mobile menu */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b sticky top-0 z-40">
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
              <span className="text-3xl font-bold">{data.total_blogs ?? 0}</span>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <h3 className="text-gray-500 text-sm">Total Authors</h3>
              <span className="text-3xl font-bold">{data.total_users ?? 0}</span>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <h3 className="text-gray-500 text-sm">Total Wishlist</h3>
              <span className="text-3xl font-bold">{data.total_wishlist ?? 0}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
