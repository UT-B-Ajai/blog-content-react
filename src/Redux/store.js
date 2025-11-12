import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/Auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
