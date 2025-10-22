import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlogDetails = () => {
  const { id } = useParams();

  // Dummy blog list
  const blogs = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Blog Post ${i + 1}`,
    author: "Ajai M",
    coverImage: `https://picsum.photos/600/400?random=${i + 1}`,
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel mauris sed eros elementum porta.</p>",
    createdAt: "2025-10-10",
  }));

  const blog = blogs.find((b) => b.id === parseInt(id)) || blogs[0];

  // Comment State
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { user: "John Doe", content: "Amazing post! Loved it ❤️", date: "2025-10-09" },
    { user: "Maria Smith", content: "Very informative. Thanks for sharing!", date: "2025-10-10" },
  ]);

  const handleAddComment = () => {
    if (comment.trim() === "") return;
    setComments([
      ...comments,
      { user: "You", content: comment, date: new Date().toISOString().split("T")[0] },
    ]);
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* Cover Image */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-b-3xl shadow-lg">
        <img
          src={blog.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{blog.title}</h1>
          <p className="text-sm opacity-90">
            by <span className="font-semibold">{blog.author}</span> •{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Main Content */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>

          {/* Comments Section */}
          <div className="mt-10 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Comments ({comments.length})
            </h2>

            {/* Comment List */}
            <div className="space-y-4 mb-8">
              {comments.map((c, i) => (
                <div
                  key={i}
                  className="bg-gray-100 p-4 rounded-xl border border-gray-200 shadow-sm"
                >
                  <p className="text-gray-800 font-semibold">{c.user}</p>
                  <div
                    className="text-gray-700 prose-sm mt-1"
                    dangerouslySetInnerHTML={{ __html: c.content }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(c.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Add a Comment
            </h3>
            <ReactQuill
              theme="snow"
              value={comment}
              onChange={setComment}
              className="bg-white rounded-xl mb-4"
              placeholder="Write something..."
            />
            <button
              onClick={handleAddComment}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition"
            >
              Post Comment
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-6 h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">
            All Blogs
          </h2>
          <ul className="space-y-3">
            {blogs.map((b) => (
              <li key={b.id}>
                <Link
                  to={`/blog/${b.id}`}
                  className={`block p-3 rounded-xl border transition hover:bg-indigo-50 hover:text-indigo-700 ${
                    b.id === parseInt(id)
                      ? "bg-indigo-100 border-indigo-400 text-indigo-700 font-semibold"
                      : "border-gray-200 text-gray-800"
                  }`}
                >
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
