import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} />\
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/users" element={<Users />} />

          <Route path="/home" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
