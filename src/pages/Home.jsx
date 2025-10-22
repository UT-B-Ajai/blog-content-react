import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const allBlogs = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Blog Post ${i + 1}`,
    coverImage: `https://picsum.photos/800/400?random=${i + 1}`,
    snippet:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac magna justo. Donec viverra purus vel purus varius...",
    author: "Ajai M",
    createdAt: "2025-10-10",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;
  const totalPages = Math.ceil(allBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const visibleBlogs = allBlogs.slice(startIndex, startIndex + blogsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-purple-600">
          Welcome to Our Blog
        </h1>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {visibleBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-purple-600 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{blog.snippet}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>👤 {blog.author}</span>
                  <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg hover:from-purple-500 hover:to-purple-700 transition-all duration-200"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
