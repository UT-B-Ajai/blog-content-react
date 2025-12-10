import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  addToWishlist,
  removeFromWishlist,
} from "../Slices/Blog/blogSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaginationModal from "../components/Pagination";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const { blogs, pagination, loading } = useSelector((state) => state.blogs);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12; // blogs per page

  useEffect(() => {
    dispatch(fetchBlogs({ page: currentPage, perPage }));
  }, [dispatch, currentPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* HERO SECTION */}
      <div className="w-full bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT IMAGE */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522199710521-72d69614c702"
              alt="Blog Intro"
              className="rounded-3xl shadow-xl w-full h-[380px] object-cover transform hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-3xl"></div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-800">
              Discover{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">
                Inspiring
              </span>{" "}
              Stories
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              Explore thoughtfully written blogs that spark creativity, provide
              insights, and keep you updated with the latest trends.
            </p>

          <button
            onClick={() => {
              const topPosition = window.innerWidth <= 768 ? 950 : 500; // mobile vs desktop
              window.scrollTo({ top: topPosition, behavior: "smooth" });
            }}
            className="mt-8 w-max px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white text-lg font-medium shadow-lg hover:scale-105 transition-all duration-300"
          >
            Start Reading →
          </button>

          </div>
        </div>
      </div>

      <div className="py-16 px-6 bg-gray-50">
        <h1 className="text-5xl font-extrabold text-center mb-14 text-gray-800">
          Latest <span className="text-purple-600">Blog Feed</span>
        </h1>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-transparent"
              >
                {/* Image Skeleton */}
                <div className="h-48 bg-gray-200 rounded-lg"></div>

                {/* Content Skeleton */}
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>

                  {/* Author & Date Skeleton */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>

                  {/* Button Skeleton */}
                  <div className="h-10 bg-gray-300 rounded-lg mt-4 w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs?.length > 0 ? (
          <>
            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-110"
                >
                  {/* Image */}
                  <img
                    src={
                      blog?.image
                        ? `http://localhost:5000/blog/${blog.image}`
                        : "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800"
                    }
                    alt={blog.title || "Default Blog Image"}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-purple-600 mb-2">
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

                        {/* Wishlist Button */}
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
              ))}
            </div>

            {/* Pagination (only if blogs exist) */}
            {pagination?.total_pages > 1 && (
              <div className="mt-10 mb-0">
                <PaginationModal
                  currentPage={currentPage}
                  totalPages={pagination?.total_pages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </>
        ) : (
          // No blogs case
          <p className="text-center text-xl text-gray-500">
            Latest blogs coming soon!
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
