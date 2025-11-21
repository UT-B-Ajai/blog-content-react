import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

// 🔑 Helper to get token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchdashboard = createAsyncThunk(
  "dashboard/fetchdashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, getAuthHeader());   
            console.log(response.data.data);
   
      return response.data.data; // ⬅ returns {total_users, total_blogs}
      
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchdashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchdashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchdashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
