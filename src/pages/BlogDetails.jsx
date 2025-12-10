import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { fetchBlogs, fetchBlogById } from "../Slices/Blog/blogSlice";
import {
  addComment,
  editComment,
  deleteComment,
} from "../Slices/Comments/commentSlice";

import { useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, blog, loading } = useSelector((state) => state.blogs);

  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    dispatch(fetchBlogById(id));
    dispatch(fetchBlogs({ page: 1, perPage: 999 }));
  }, [id, dispatch]);

  if (loading || !blog)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-purple-600">
        Loading blog...
      </div>
    );

  const blogData = blog.blog;
  const comments = blog.comments ?? [];

  // -------------------------------
  // ADD NEW COMMENT
  // -------------------------------
  const handleAddComment = () => {
    if (!comment.trim()) return;

    dispatch(
      addComment({
        blog_id: id,
        comment,
      })
    ).then(() => {
      setComment("");
      dispatch(fetchBlogById(id));
    });
  };

  // -------------------------------
  // OPEN EDIT COMMENT
  // -------------------------------
  const handleEditOpen = (c) => {
    setEditingComment(c);
    setEditText(c.comment);
    setEditModal(true);
  };

  // -------------------------------
  // SAVE EDIT COMMENT
  // -------------------------------
  const handleEditSave = () => {
    dispatch(
      editComment({
        comment_id: editingComment._id,
        comment: editText,
      })
    ).then(() => {
      setEditModal(false);
      dispatch(fetchBlogById(id));
    });
  };

  // -------------------------------
  // DELETE COMMENT
  // -------------------------------
  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId)).then(() => {
      dispatch(fetchBlogById(id));
    });
  };

return (
  <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pb-16">

    {/* Banner Section */}
    <div className="relative w-full h-[420px] overflow-hidden shadow-xl">
      <img
        src={
          blogData.cover_image
            ? `http://localhost:5000/blog/${blogData.cover_image}`
            : "https://picsum.photos/1200"
        }
        alt="Cover"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-3">
          {blogData.title}
        </h1>

        <p className="text-sm opacity-90 font-light">
          by{" "}
          <span className="font-semibold">
            {blogData.user_id?.name || "Unknown User"}
          </span>{" "}
          • {new Date(blogData.created_at).toLocaleDateString()}
        </p>

        <button
          onClick={() => navigate("/home")}
          className="absolute top-6 left-6 text-sm bg-white/20 hover:bg-white/40 px-4 py-1 rounded-full backdrop-blur-lg transition text-white shadow"
        >
          Home
        </button>
      </div>
    </div>

    {/* Main Layout */}
    <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* MAIN CONTENT */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">

        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        ></div>

        {/* Comment Section */}
      {/* Comment Section */}
<div className="mt-10">
  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
    💬 Comments <span className="text-gray-500 text-lg">({comments.length})</span>
  </h2>

  {/* No Comments */}
  {comments.length === 0 && (
    <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500 text-sm italic">
      No comments yet. Be the first!
    </div>
  )}

  {/* Comments List */}
  <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
    {comments
      .slice(0, showAll ? comments.length : 2)
      .map((c) => (
        <div
          key={c._id}
          className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow transition relative"
        >
          <p className="text-gray-900 font-semibold text-sm">{c.user?.name}</p>

          <div
            className="text-gray-700 mt-1 text-sm"
            dangerouslySetInnerHTML={{ __html: c.comment }}
          ></div>

          <p className="text-[11px] text-gray-500 mt-2">
            {new Date(c.created_at).toLocaleString()}
          </p>

          <div className="absolute top-3 right-3 flex gap-3">
            {c.can_edit && (
              <button
                onClick={() => handleEditOpen(c)}
                className="text-blue-600 hover:text-blue-700 text-xs font-medium"
              >
                ✏ Edit
              </button>
            )}

            {c.can_delete && (
              <button
                onClick={() => handleDeleteComment(c._id)}
                className="text-red-600 hover:text-red-700 text-xs font-medium"
              >
                🗑 Delete
              </button>
            )}
          </div>
        </div>
      ))}
  </div>

  {comments.length > 2 && (
    <button
      onClick={() => setShowAll(!showAll)}
      className="mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
    >
      {showAll ? "Show Less ▲" : "Show All ▼"}
    </button>
  )}

  {/* Add Comment */}
  <div className="mt-8">
    <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>

    <div className="bg-gray-50 border border-gray-300 rounded-lg p-2 mb-3">
      <ReactQuill
        theme="snow"
        value={comment}
        onChange={setComment}
        className="bg-white rounded-lg text-sm"
      />
    </div>

    <button
      onClick={handleAddComment}
      className="px-5 py-2 from-purple-500 bg-gradient-to-r to-purple-700 text-white text-sm rounded-lg shadow hover:bg-purple-700 hover:text-white transition"
    >
      Add Comment
    </button>
  </div>
</div>

      </div>

      {/* SIDEBAR */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 sticky top-10 h-fit">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
          📰 Latest Blogs
        </h2>

        <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {blogs.map((b) => (
            <li key={b._id}>
              <Link
                to={`/blog/${b._id}`}
                className={`block p-3 rounded-lg border transition text-sm ${
                  b._id === id
                    ? "bg-purple-100 border-purple-400 text-purple-700 font-semibold"
                    : "bg-gray-50 border-gray-200 hover:bg-purple-50 hover:border-purple-300"
                }`}
              >
                {b.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* EDIT MODAL */}
    {editModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-6 rounded-xl w-[420px] shadow-xl border border-gray-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Comment</h2>

          <div className="bg-gray-50 border p-2 rounded-xl">
            <ReactQuill value={editText} onChange={setEditText} />
          </div>

          <div className="flex justify-end mt-5 gap-3">
            <button
              onClick={() => setEditModal(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleEditSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default BlogDetails;
