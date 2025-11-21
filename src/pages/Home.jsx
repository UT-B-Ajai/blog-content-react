import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs,  addToWishlist, removeFromWishlist, } from "../Slices/Blog/blogSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
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

      <div className="py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-purple-600">
          Blog Feed
        </h1>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading blogs...</p>
        ) : (
          <>
            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogs?.map((blog) => (
                <div
                  key={blog._id}
                  className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-110"
                >
                  {/* Image */}
                  <img
                    src={`http://localhost:5000/blog/${blog.cover_image}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-purple-600 mb-2">
                      {blog.title}
                    </h2>

                    <div
                      className="text-gray-600 text-sm mb-4"
                      dangerouslySetInnerHTML={{
                        __html: blog.content?.slice(0, 120),
                      }}
                    ></div>

                <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-gray-600 flex items-center gap-1">
                👤 {blog.author || "Unknown"}
              </span>

              <div className="flex items-center gap-4">
                <span className="text-gray-500 flex items-center gap-1">
                  📅 {new Date(blog.created_at).toLocaleDateString()}
                </span>

                {/* ❤️ Stylish Wishlist Button */}
         <button
            onClick={() =>
              blog.is_wishlist === 1
                ? dispatch(removeFromWishlist(blog._id))
                : dispatch(addToWishlist(blog._id))
            }
            className="transition transform hover:scale-125"
          >
            {blog.is_wishlist === 1 ? (
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

            {/* Pagination */}
            <div className="mt-10">
              <PaginationModal
                currentPage={currentPage}
                totalPages={pagination?.total_pages || 1}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
