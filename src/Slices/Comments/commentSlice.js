import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const COMMENT_API = "http://localhost:5000/api/comments";

// Get token helper
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

/* ---------------------------------------------------------
   🔹 FETCH COMMENTS FOR A BLOG
--------------------------------------------------------- */
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (blogId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${COMMENT_API}/${blogId}`);
      return res.data.data; // array of comments
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch comments");
    }
  }
);

/* ---------------------------------------------------------
   🔹 ADD COMMENT
--------------------------------------------------------- */
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ blog_id, comment }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${COMMENT_API}`,
        { blog_id, comment },
        authHeader()
      );
      return res.data.data; // newly created comment
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add comment");
    }
  }
);

/* ---------------------------------------------------------
   🔹 EDIT COMMENT
--------------------------------------------------------- */
export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/comments/${id}`,
        { comment },
        authHeader()
      );

      return response.data; // success
    } catch (error) {
      // Handle backend errors properly
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

/* ---------------------------------------------------------
   🔹 DELETE COMMENT
--------------------------------------------------------- */
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${COMMENT_API}/${id}`, authHeader());
      return id; // return ID to remove from UI
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete comment");
    }
  }
);

/* ---------------------------------------------------------
   🔹 SLICE
--------------------------------------------------------- */
const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [], // list of comments for selected blog
    loading: false,
    error: null,
    message: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /* ---------------------- Fetch Comments ---------------------- */
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------------- Add Comment ---------------------- */
      /* ---------------------- Add Comment ---------------------- */
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload.data || action.payload);
        state.message = "Comment added successfully";
        toast.success(action.payload.message || "Comment added successfully");
      })

      /* ---------------------- Edit Comment ---------------------- */
      .addCase(editComment.fulfilled, (state, action) => {
        const updated = action.payload.data || action.payload;

        state.comments = state.comments.map((c) =>
          c._id === updated._id ? updated : c
        );

        state.message = "Comment updated successfully";
        toast.success(action.payload.message || "Comment updated successfully");
      })

      /* ---------------------- Delete Comment ---------------------- */
      .addCase(deleteComment.fulfilled, (state, action) => {
        const deletedId = action.payload.id || action.payload;

        state.comments = state.comments.filter((c) => c._id !== deletedId);

        state.message = "Comment deleted successfully";
        toast.success(action.payload.message || "Comment deleted successfully");
      });
  },
});

export default commentSlice.reducer;
