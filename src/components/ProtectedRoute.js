import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // check if logged in

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
