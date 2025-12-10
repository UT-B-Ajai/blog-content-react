import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FaEdit, FaTrash, FaBars, FaSearch } from "react-icons/fa";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOurBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../Slices/Blog/blogSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, pagination } = useSelector((state) => state.blogs);
  console.log(pagination, "pageinationdata");
  console.log(blogs, "blog data");

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
  const [isSaving, setIsSaving] = useState(false);

  // Local pagination controls
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const totalPages = pagination?.total_pages || 1;
  // 🟣 Fetch all blogs
  useEffect(() => {
    dispatch(fetchOurBlogs({ page: currentPage, perPage, search }));
  }, [dispatch, currentPage, perPage, search]);

  // 🔍 Search filter
  const filteredBlogs = blogs?.filter(
    (blog) =>
      blog?.title.toLowerCase().includes(search.toLowerCase()) ||
      blog?.content.toLowerCase().includes(search.toLowerCase())
  );

  // ✏️ Add or Update Blog
const handleSaveBlog = async () => {
  if (!newBlogTitle.trim()) return alert("Blog title is required!");
  setIsSaving(true);
  const formData = new FormData();
  formData.append("title", newBlogTitle);
  formData.append("content", newBlogContent);
  if (coverImage) formData.append("cover_image", coverImage);
  if (blogImage) formData.append("image", blogImage);

  let response;

  if (editBlogId) {
    response = await dispatch(updateBlog({ id: editBlogId, formData }));
  } else {
    response = await dispatch(createBlog(formData));
  }

  // Refresh blog list after success
  if (response?.meta?.requestStatus === "fulfilled") {
    await dispatch(fetchOurBlogs({ page: currentPage, perPage, search }));

    setIsModalOpen(false);
    resetForm();
  }

  setIsSaving(false); // Stop loading
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
    setEditBlogId(blog?._id);
    setNewBlogTitle(blog?.title);
    setNewBlogContent(blog?.content);
    setIsModalOpen(true);
  };

  // 🗑️ Delete
  const openDeleteModal = (blog) => {
    setDeleteBlogId(blog?._id);
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

      {/* Main Section */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 h-screen overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b sticky top-0 z-40">
          <Header />
        </div>

        {/* Scrollable Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold">Blogs</h2>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-end items-center mt-0 mb-4 gap-4">
            <button
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-2 px-4 rounded-lg font-medium"
              onClick={() => {
                setIsModalOpen(true);
                resetForm();
              }}
            >
              Add Blog
            </button>

            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 p-2 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              />
            </div>
          </div>

          {/* Blog Table */}
          <div className="bg-white shadow-md rounded-lg">
            <div className="overflow-y-auto max-h-[60vh] scrollbar-hide">
              <table className="w-full table-fixed text-sm">
                <thead className="sticky top-0 bg-gradient-to-r from-purple-100 to-purple-200 text-gray-800 uppercase text-xs font-semibold z-10">
                  <tr>
                    <th className="w-10 py-2 px-3 text-left">#</th>
                    <th className="w-40 py-2 px-3 text-left">Title</th>
                    <th className="w-60 py-2 px-3 text-left">Content</th>
                    <th className="w-20 py-2 px-3 text-center">Cover</th>
                    <th className="w-40 py-2 px-3 text-left">Author</th>
                    <th className="w-36 py-2 px-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center p-4">
                        Loading...
                      </td>
                    </tr>
                  ) : blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <tr className="border-b hover:bg-gray-50" key={blog?._id}>
                        <td className="py-2 px-3 text-left">{blog?.s_no}</td>
                        <td className="py-2 px-3 text-left">{blog?.title}</td>
                        <td className="py-2 px-3 text-left">
                          {" "}
                          <div
                            className="truncate" // optional, truncate long content
                            dangerouslySetInnerHTML={{
                              __html: blog.content?.slice(0, 120),
                            }}
                          ></div>
                        </td>
                        <td className="py-2 px-3 text-center">
                          {blog?.cover_image ? (
                            <img
                              src={
                                blog?.cover_image.startsWith("http")
                                  ? blog?.cover_image
                                  : `http://localhost:5000/blog/${blog?.cover_image}`
                              }
                              alt="cover"
                              className="w-14 h-10 object-cover rounded-md border mx-auto"
                            />
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="py-2 px-3 text-left">{blog?.author}</td>
                        <td className="py-2 px-3 flex justify-center space-x-2">
                          <button
                            className="p-2 bg-purple-500 text-white rounded-lg"
                            onClick={() => handleEdit(blog)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="p-2 bg-red-500 text-white rounded-lg"
                            onClick={() => openDeleteModal(blog)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">
                        No blogs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="py-3 flex justify-end space-x-2">
            <button
              className={`px-3 py-1 bg-gray-200 rounded ${
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
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className={`px-3 py-1 bg-gray-200 rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      </div>

      {/* ======================== MODALS OUTSIDE MAIN CONTENT ======================== */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              {editBlogId !== null ? "Edit Blog" : "Add New Blog"}
            </h3>

            {/* Blog Title */}
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">
                Blog Title
              </label>
              <input
                type="text"
                placeholder="Enter blog title"
                value={newBlogTitle}
                onChange={(e) => setNewBlogTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Blog & Cover Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blog Image */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Blog Image
                </label>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer hover:bg-purple-50 transition-all duration-200">
                  {blogImage ? (
                    <img
                      src={URL.createObjectURL(blogImage)}
                      alt="Blog Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <p className="text-purple-500">
                      Click or drag file to upload
                    </p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setBlogImage(e.target.files[0])}
                  />
                </label>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Cover Image
                </label>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer hover:bg-purple-50 transition-all duration-200">
                  {coverImage ? (
                    <img
                      src={URL.createObjectURL(coverImage)}
                      alt="Cover Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <p className="text-purple-500">
                      Click or drag file to upload
                    </p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            {/* Blog Content */}
            <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-2">
                Blog Content
              </label>
              <ReactQuill
                theme="snow"
                value={newBlogContent}
                onChange={setNewBlogContent}
                placeholder="Write your blog content here..."
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-200"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg 
                          hover:from-purple-600 hover:to-purple-800 shadow-md transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving}
                onClick={handleSaveBlog}
              >
                {isSaving
                  ? editBlogId ? "Updating..." : "Adding..."
                  : editBlogId ? "Update Blog" : "Add Blog"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm  flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this blog?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg hover:from-purple-500 hover:to-purple-700 transition-all duration-200"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-200"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
