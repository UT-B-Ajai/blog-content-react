import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FaEdit, FaTrash, FaBars, FaSearch } from "react-icons/fa";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUser, deleteUser } from "../Slices/User/userSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, pagination } = useSelector((state) => state.users);
  console.log(pagination, "pageinationdata");
  console.log(users, "usersData");

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserTitle, setNewUserTitle] = useState("");
  const [newUserContent, setNewUserContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [UserImage, setUserImage] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Local pagination controls
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const totalPages = pagination?.total_pages || 1;
  // 🟣 Fetch all Users
  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, perPage, search }));
  }, [dispatch, currentPage, perPage, search]);

  // 🔍 Search filter
  const filteredUsers = users?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase() || "")
  );

  // ✏️ Add or Update User
  const handleSaveUser = () => {
    if (!newUserTitle.trim()) return alert("User title is required!");

    const formData = new FormData();
    formData.append("title", newUserTitle);
    formData.append("content", newUserContent);
    if (coverImage) formData.append("cover_image", coverImage);
    if (UserImage) formData.append("image", UserImage);

    if (editUserId) {
      dispatch(updateUser({ id: editUserId, formData }));
    }

    setIsModalOpen(false);
    resetForm();
  };

  // ♻️ Reset form
  const resetForm = () => {
    setNewUserTitle("");
    setNewUserContent("");
    setCoverImage(null);
    setUserImage(null);
    setEditUserId(null);
  };

  // 🧾 Edit
  const handleEdit = (user) => {
    setEditUserId(user._id);
    setNewUserTitle(user.title);
    setNewUserContent(user.content);
    setIsModalOpen(true);
  };

  // 🗑️ Delete
  const openDeleteModal = (id) => {
    setDeleteUserId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteUser(deleteUserId));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col ml-0 md:ml-64 h-screen overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b sticky top-0 z-40">
          <Header />
        </div>

          {/* Scrollable Page Content */}
          <div className="p-6 flex-1 ">
            <h2 className="text-2xl font-bold">Users</h2>

            {/* Toolbar (Add + Search) */}
            <div className="flex flex-col md:flex-row justify-end items-center mt-0 mb-4 gap-4">
              {/* <button
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-500 hover:to-purple-700"
              onClick={() => {
                setIsModalOpen(true);
                resetForm();
              }}
            >
              Add User
            </button> */}

              <div className="relative w-full md:w-64">
                <FaSearch className="absolute left-3 top-3 " />
                <input
                  type="text"
                  placeholder="Search Users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 p-2 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                />
              </div>
            </div>

            {/* User Table Section */}
            <div className="bg-white shadow-md rounded-lg">
              <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
                <table className="w-full table-auto text-sm">
                  {/* THEAD */}
                  <thead className="sticky top-0 bg-gradient-to-r from-purple-100 to-purple-200 text-gray-800 uppercase text-xs font-semibold z-10">
                    <tr>
                      <th className="py-2 px-3 text-left w-10">#</th>
                      <th className="py-2 px-3 text-left w-40">Name</th>
                      <th className="py-2 px-3 text-left w-60">Email</th>
                      <th className="py-2 px-3 text-left w-32">Role</th>
                      <th className="py-2 px-3 text-center w-32">Actions</th>
                    </tr>
                  </thead>

                  {/* TBODY */}
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center p-4">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      users?.map((user) => (
                        <tr key={user._id} className="border-b">
                          <td className="py-2 px-3">{user.s_no}</td>
                          <td className="py-2 px-3">{user.name}</td>
                          <td className="py-2 px-3">{user.email}</td>
                          <td className="py-2 px-3">{user.role}</td>

                          <td className="py-2 px-3 flex space-x-2 justify-center">
                            {/* <button
                              className="p-2 bg-purple-500 text-white rounded-lg"
                              onClick={() => handleEdit(user)}
                            >
                              <FaEdit />
                            </button> */}

                            <button
                              className="p-2 bg-red-500 text-white rounded-lg"
                              onClick={() => openDeleteModal(user._id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

    {/* ⚡ Edit User Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
          <h2 className="text-xl font-bold mb-4 text-purple-600">
            Edit User
          </h2>

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={newUserTitle}
            onChange={(e) => setNewUserTitle(e.target.value)}
            className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={newUserContent}
            onChange={(e) => setNewUserContent(e.target.value)}
            className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Role */}
          <select
            value={UserImage || ""} // reuse UserImage state for role temporarily
            onChange={(e) => setUserImage(e.target.value)}
            className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              onClick={handleSaveUser}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )}

      {/* ⚡ Delete User Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Confirm Delete
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>

            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
