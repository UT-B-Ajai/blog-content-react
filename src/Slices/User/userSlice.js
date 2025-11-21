// Userslice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// 🔵 FETCH ALL Users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page = 1, perPage = 10, search = "" } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}?page=${page}&perPage=${perPage}&search=${search}`,
        getAuthHeader()
      );
      return res.data; // <-- return full API response
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch users");
    }
  }
);

// 🟣 UPDATE USER
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, formData, getAuthHeader());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update user");
    }
  }
);

// 🔴 DELETE USER
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      return { ...res.data, id };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete user");
    }
  }
);

const userslice = createSlice({
  name: "users",
  initialState: {
    users: [],
    pagination: {},
    users: null,
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    clearUserMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        const { users, pagination } = action.payload.data;
console.log(action.payload.data,"us");

        state.users = users
;
        state.pagination = pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;

        state.users = state.users.filter(
          (u) => u._id !== action.payload.id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserMessage } = userslice.actions;
export default userslice.reducer;
