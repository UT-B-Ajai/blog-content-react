import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([
    { id: 1, title: "First Blog", author: "Admin", content: "Content for first blog", cover: null },
    { id: 2, title: "Second Blog", author: "Admin", content: "Content for second blog", cover: null },
    { id: 3, title: "Third Blog", author: "Admin", content: "Content for third blog", cover: null },
    { id: 4, title: "Fourth Blog", author: "Admin", content: "Content for fourth blog", cover: null },
    { id: 5, title: "Fifth Blog", author: "Admin", content: "Content for fifth blog", cover: null },
    { id: 6, title: "Sixth Blog", author: "Admin", content: "Content for sixth blog", cover: null },
  ]);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [blogImage, setBlogImage] = useState(null);

  const [editBlogId, setEditBlogId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5; // Blogs per page

  // Filter blogs based on search
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.content.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Save or Update Blog
  const handleSaveBlog = () => {
    if (!newBlogTitle.trim()) return alert("Blog title is required!");

    if (editBlogId !== null) {
      setBlogs(
        blogs.map((blog) =>
          blog.id === editBlogId
            ? { ...blog, title: newBlogTitle, content: newBlogContent, cover: coverImage, blog_image: blogImage }
            : blog
        )
      );
    } else {
      const newBlog = {
        id: blogs.length + 1,
        title: newBlogTitle,
        content: newBlogContent,
        cover: coverImage,
        blog_image: blogImage,
        author: "Admin",
      };
      setBlogs([...blogs, newBlog]);
    }

    // Reset modal
    setNewBlogTitle("");
    setNewBlogContent("");
    setCoverImage(null);
    setBlogImage(null);
    setEditBlogId(null);
    setIsModalOpen(false);
  };

  // Edit Blog
  const handleEdit = (blog) => {
    setNewBlogTitle(blog.title);
    setNewBlogContent(blog.content || "");
    setCoverImage(blog.cover || null);
    setBlogImage(blog.blog_image || null);
    setEditBlogId(blog.id);
    setIsModalOpen(true);
  };

  // Delete Blog
  const openDeleteModal = (id) => {
    setDeleteBlogId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setBlogs(blogs.filter((blog) => blog.id !== deleteBlogId));
    setDeleteBlogId(null);
    setIsDeleteModalOpen(false);
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-100">
    <Sidebar onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header />
      {/* Overlay (for mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
        <div className="p-6 flex-1">
          {/* Header + Search + Add */}
            <h2 className="text-2xl font-bold">Blogs</h2>

          <div className="flex flex-col md:flex-row justify-end items-center mt-4 mb-6 gap-4">

            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              className="bg-gradient-to-r from-purple-400 to-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:from-purple-500 hover:to-purple-700"
              onClick={() => {
                setIsModalOpen(true);
                setEditBlogId(null);
                setNewBlogTitle("");
                setNewBlogContent("");
                setCoverImage(null);
                setBlogImage(null);
              }}
            >
              Add Blog
            </button>
          </div>

          {/* Blog Table */}
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Content</th>
                <th className="py-2 px-4 text-left">Cover</th>
                <th className="py-2 px-4 text-left">Author</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.map((blog) => (
                <tr key={blog.id} className="border-b">
                  <td className="py-2 px-4">{blog.id}</td>
                  <td className="py-2 px-4">{blog.title}</td>
                  <td className="py-2 px-4">{blog.content ? blog.content.slice(0, 50) + "..." : "-"}</td>
                  <td className="py-2 px-4">
                    {blog.cover ? (
                      <img src={URL.createObjectURL(blog.cover)} alt="cover" className="w-20 h-12 object-cover rounded" />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-2 px-4">{blog.author}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <button
                      className="px-2 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg hover:from-purple-500 hover:to-purple-700 transition-all duration-200"
                      onClick={() => handleEdit(blog)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="px-2 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-200"
                      onClick={() => openDeleteModal(blog.id)}
                    >
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
                  currentPage === i + 1 ? "bg-purple-500 text-white" : "bg-gray-200 hover:bg-gray-300"
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

          {/* Add/Edit Blog Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 transition-all duration-300">
              <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditBlogId(null);
                    setNewBlogTitle("");
                    setNewBlogContent("");
                    setCoverImage(null);
                    setBlogImage(null);
                  }}
                >
                  ✕
                </button>

                <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                  {editBlogId !== null ? "Edit Blog" : "Add New Blog"}
                </h3>

                {/* Title */}
                <div className="mb-5">
                  <label className="block text-gray-700 font-medium mb-2">Blog Title</label>
                  <input
                    type="text"
                    placeholder="Enter blog title"
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Blog + Cover Image side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Blog Image */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Blog Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer hover:bg-purple-50 transition-all duration-200">
                      {blogImage ? (
                        <img src={URL.createObjectURL(blogImage)} alt="Blog Preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="flex flex-col items-center text-purple-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3" />
                          </svg>
                          <p>Click or drag file to upload</p>
                        </div>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setBlogImage(e.target.files[0])} />
                    </label>
                  </div>

                  {/* Cover Image */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Cover Image</label>
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer hover:bg-purple-50 transition-all duration-200">
                      {coverImage ? (
                        <img src={URL.createObjectURL(coverImage)} alt="Cover Preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="flex flex-col items-center text-purple-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3" />
                          </svg>
                          <p>Click or drag file to upload</p>
                        </div>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setCoverImage(e.target.files[0])} />
                    </label>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="mt-6">
                  <label className="block text-gray-700 font-medium mb-2">Blog Content</label>
                  <ReactQuill theme="snow" value={newBlogContent} onChange={setNewBlogContent} placeholder="Write your blog content here..." className="rounded-lg bg-white" />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-200"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditBlogId(null);
                      setNewBlogTitle("");
                      setNewBlogContent("");
                      setCoverImage(null);
                      setBlogImage(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 shadow-md transition-all duration-200"
                    onClick={handleSaveBlog}
                  >
                    {editBlogId !== null ? "Update Blog" : "Add Blog"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
      </div>
    </div>
  );
};

export default Blogs;
