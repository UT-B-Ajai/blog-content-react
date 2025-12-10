  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import {
    fetchOurBlogs,
    addToWishlist,
    removeFromWishlist,
  } from "../Slices/Blog/blogSlice";
  import { useNavigate } from "react-router-dom";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  import { FaHeart, FaRegHeart } from "react-icons/fa";
  import PaginationModal from "../components/Pagination";

  const OurBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { blogs, pagination, loading } = useSelector((state) => state.blogs);

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 12;

    useEffect(() => {
      dispatch(fetchOurBlogs({ page: currentPage, perPage }));
    }, [dispatch, currentPage]);

return (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    {/* PAGE CONTENT */}
    <div className="flex-1 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-600">
        My Blog
      </h1>

      {/* Loading or Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-transparent"
            >
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded-lg mt-4 w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Blog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-0">
            {blogs?.length === 0 ? (
              <p className="text-center text-2xl text-gray-500 col-span-3 py-16">
                🚫 No Blogs Found
              </p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:scale-105 border-2 border-transparent hover:border-purple-400"
                >
                  <img
                    src={
                      blog?.image
                        ? `http://localhost:5000/blog/${blog.image}`
                        : "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800"
                    }
                    alt={blog.title || "Default Blog Image"}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-purple-600 mb-2">
                      {blog.title}
                    </h2>

                  <div className="text-gray-600 text-sm mb-4">
                    {blog.content?.replace(/<[^>]+>/g, "").slice(0, 120)}...
                  </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-600 flex items-center gap-1">
                        👤 {blog.author || "Unknown"}
                      </span>

                      <div className="flex items-center gap-4">
                        <span className="text-gray-500 flex items-center gap-1">
                          📅 {new Date(blog.created_at).toLocaleDateString()}
                        </span>

                    <button
                      onClick={() =>
                        blog.is_wishlist
                          ? dispatch(removeFromWishlist(blog._id))
                          : dispatch(addToWishlist(blog._id))
                      }
                      className="transition transform hover:scale-125"
                    >
                      {blog.is_wishlist ? (
                        <FaHeart className="text-red-600 drop-shadow-md text-xl transition-all duration-300" />
                      ) : (
                        <FaRegHeart className="text-purple-500 hover:text-purple-600 drop-shadow-sm text-xl transition-all duration-300" />
                      )}
                    </button>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/blog/${blog._id}`)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg hover:from-purple-500 hover:to-purple-700 transition-all duration-200"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {blogs?.length > 0 && pagination?.total_pages > 1 && (
            <div className="mt-10 mb-0">
              <PaginationModal
                currentPage={currentPage}
                totalPages={pagination.total_pages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>

    <Footer />
  </div>
);
  };

  export default OurBlog;
