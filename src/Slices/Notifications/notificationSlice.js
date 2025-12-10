import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/notifications";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// FETCH
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL, getAuthHeader());
      return res.data.data;
    } catch (err) {
      console.error("Fetch notifications error:", err.response || err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// MARK ONE
export const markNotificationRead = createAsyncThunk(
  "notifications/markOne",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/read/${id}`,
        {},
        getAuthHeader()
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// MARK ALL
export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/read-all`,
        {},
        getAuthHeader()
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    unreadCount: 0,
  },
reducers: {
  pushNotification: (state, action) => {
    const exists = state.list.find((n) => n._id === action.payload._id);
    if (!exists) {
      state.list.unshift(action.payload);
      state.unreadCount += 1;
    }
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.list = action.payload;        
        state.unreadCount = action.payload.filter(
          (n) => !n.read_status
        ).length;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (n) => n._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index].read_status = true;
          state.unreadCount--;
        }
      })
    .addCase(markAllNotificationsRead.fulfilled, (state) => {
      state.list = state.list.map((n) => ({
        ...n,
        read_status: true,
      }));
      state.unreadCount = 0;
    });
      },
});

export const { pushNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
