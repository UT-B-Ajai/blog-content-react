import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";
const WISHLIST_URL = "http://localhost:5000/api/wishlist";


// 🔑 Helper to get token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  console.log(token ,"auth_token");
  
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};

//
// 🟢 CREATE Blog
//
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData, getAuthHeader());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create blog");
    }
  }
);

//
// 🔵 GET All Blogs
//
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async ({ page = 1, perPage = 10, search = "" } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}?page=${page}&perPage=${perPage}&search=${encodeURIComponent(search)}`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch blogs");
    }
  }
);


//
// 🟣 GET Blog by ID
//
export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch blog");
    }
  }
);

//
// 🟠 UPDATE Blog
//
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update blog");
    }
  }
);

//
// 🔴 DELETE Blog
//
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete blog");
    }
  }
);

//
// ⭐ ADD to Wishlist
//
export const addToWishlist = createAsyncThunk(
  "blogs/addToWishlist",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${WISHLIST_URL}`,
        {},
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add wishlist");
    }
  }
);

//
// ⭐ REMOVE from Wishlist
//
export const removeFromWishlist = createAsyncThunk(
  "blogs/removeFromWishlist",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${WISHLIST_URL}/${id}`,
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove wishlist");
    }
  }
);


//
// 🧩 Slice
//
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    pagination: {},
    blog: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearBlogMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.blogs.unshift(action.payload.data);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ALL
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
          const { blogs, pagination } = action.payload.data || {};    
          console.log(pagination,"page");
                
          state.blogs = blogs || [];
          state.pagination = pagination || null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH BY ID
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== action.meta.arg
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ⭐ ADD to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        // OPTIONAL: Update blog list if wishlist status is returned
        const updated = action.payload?.data;
        if (updated) {
          state.blogs = state.blogs.map((b) =>
            b._id === updated._id ? updated : b
          );
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ⭐ REMOVE from Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        // OPTIONAL: update list if API returns updated blog
        const updated = action.payload?.data;
        if (updated) {
          state.blogs = state.blogs.map((b) =>
            b._id === updated._id ? updated : b
          );
        }
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearBlogMessage } = blogSlice.actions;
export default blogSlice.reducer;
