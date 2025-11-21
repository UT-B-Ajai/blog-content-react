import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FaEdit, FaTrash, FaBars, FaSearch } from "react-icons/fa";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../Slices/Blog/blogSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, pagination } = useSelector((state) => state.blogs);
  console.log(pagination, "pageinationdata");

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [blogImage, setBlogImage] = useState(null);
  const [editBlogId, setEditBlogId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Local pagination controls
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const totalPages = pagination?.total_pages || 1;
  // 🟣 Fetch all blogs
  useEffect(() => {
    dispatch(fetchBlogs({ page: currentPage, perPage, search }));
  }, [dispatch, currentPage, perPage, search]);

  // 🔍 Search filter
  const filteredBlogs = blogs?.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.content.toLowerCase().includes(search.toLowerCase())
  );

  // ✏️ Add or Update Blog
  const handleSaveBlog = () => {
    if (!newBlogTitle.trim()) return alert("Blog title is required!");

    const formData = new FormData();
    formData.append("title", newBlogTitle);
    formData.append("content", newBlogContent);
    if (coverImage) formData.append("cover_image", coverImage);
    if (blogImage) formData.append("image", blogImage);

    if (editBlogId) {
      dispatch(updateBlog({ id: editBlogId, formData }));
    } else {
      dispatch(createBlog(formData));
    }

    setIsModalOpen(false);
    resetForm();
  };

  // ♻️ Reset form
  const resetForm = () => {
    setNewBlogTitle("");
    setNewBlogContent("");
    setCoverImage(null);
    setBlogImage(null);
    setEditBlogId(null);
  };

  // 🧾 Edit
  const handleEdit = (blog) => {
    setEditBlogId(blog._id);
    setNewBlogTitle(blog.title);
    setNewBlogContent(blog.content);
    setIsModalOpen(true);
  };

  // 🗑️ Delete
  const openDeleteModal = (id) => {
    setDeleteBlogId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteBlog(deleteBlogId));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}

      <Sidebar />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Section */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 h-screen overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b sticky top-0 z-40">
          <Header />
        </div>

        {/* Scrollable Page Content */}
        <div className="p-6 flex-1 ">
          <h2 className="text-2xl font-bold">Blogs</h2>

          {/* Toolbar (Add + Search) */}
          <div className="flex flex-col md:flex-row justify-end items-center mt-0 mb-4 gap-4">
            <button
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-500 hover:to-purple-700"
              onClick={() => {
                setIsModalOpen(true);
                resetForm();
              }}
            >
              Add Blog
            </button>

            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-3 " />
              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 pl-10 rounded-lg w-full focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Blog Table Section */}
          <div className="bg-white shadow-md rounded-lg">
            <div className="overflow-y-auto max-h-[60vh] scrollbar-hide">
              <table className="w-full table-auto text-sm">
                <thead className="sticky top-0 bg-gradient-to-r from-purple-100 to-purple-200 text-gray-800 uppercase text-xs font-semibold z-10">
                  <tr>
                    <th className="py-2 px-3 text-left w-[5%]">#</th>
                    <th className="py-2 px-3 text-left w-[25%]">Title</th>
                    <th className="py-2 px-3 text-left w-[40%]">Content</th>
                    <th className="py-2 px-3 text-left w-[15%]">Cover</th>
                    <th className="py-2 px-3 text-center w-[15%]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center p-4">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <tr className="border-b hover:bg-gray-50" key={blog._id}>
                        <td className="py-2 px-3">{blog.s_no}</td>
                        <td className="py-2 px-3">{blog.title}</td>
                        <td className="py-2 px-3 ">
                          {blog.content?.slice(0, 40)}...
                        </td>
                        <td className="py-2 px-3">
                          {blog.cover_image ? (
                            <img
                              src={
                                blog.cover_image.startsWith("http")
                                  ? blog.cover_image
                                  : `http://localhost:5000/blog/${blog.cover_image}`
                              }
                              alt="cover"
                              className="w-14 h-10 object-cover rounded-md border"
                            />
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="py-2 px-3 flex space-x-2 justify-center">
                          <button
                            className="p-2 bg-purple-500 text-white rounded-lg"
                            onClick={() => handleEdit(blog)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="p-2 bg-red-500 text-white rounded-lg"
                            onClick={() => openDeleteModal(blog._id)}
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
        {/* Pagination Section */}
        <div className="bottom-0 py-2 flex justify-end px-5 space-x-2">
          <button
            className={`px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaAngleDoubleLeft />
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
            className={`px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
