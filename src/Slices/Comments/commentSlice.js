import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  async ({  blog_id, comment }, { rejectWithValue }) => {
    
    try {
      const res = await axios.post(
        `${COMMENT_API}`,
        {  blog_id, comment },
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
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${COMMENT_API}/${commentId}`,
        { content },
        authHeader()
      );
      return res.data.data; // updated comment
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update comment");
    }
  }
);

/* ---------------------------------------------------------
   🔹 DELETE COMMENT
--------------------------------------------------------- */
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await axios.delete(`${COMMENT_API}/${commentId}`, authHeader());
      return commentId; // return ID to remove from UI
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
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.message = "Comment added successfully";
      })

      /* ---------------------- Edit Comment ---------------------- */
      .addCase(editComment.fulfilled, (state, action) => {
        const updated = action.payload;
        state.comments = state.comments.map((c) =>
          c._id === updated._id ? updated : c
        );
        state.message = "Comment updated successfully";
      })

      /* ---------------------- Delete Comment ---------------------- */
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c._id !== action.payload);
        state.message = "Comment deleted successfully";
      });
  },
});

export default commentSlice.reducer;
