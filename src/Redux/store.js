import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/Auth/authSlice";
import blogReducer from "../Slices/Blog/blogSlice";
import menuReducer from "../Slices/menu/MenuSlice";
import usersReducer from "../Slices/User/userSlice";
import dashboardReducer from "../Slices/Dashboard/dashboardSlice";
import commentReducer from "../Slices/Comments/commentSlice";
import notificationReducer from "../Slices/Notifications/notificationSlice";
import { comment } from "postcss";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    menu : menuReducer,
    users: usersReducer,
    dashboard:dashboardReducer,
    comments: commentReducer,
    notifications:notificationReducer,

  },

  });


