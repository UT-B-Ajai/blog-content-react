import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

// ✅ Lazy load each page
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Home = lazy(() => import("./pages/Home"));
const OurBlog = lazy(() => import("./pages/OurBlog"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const Users = lazy(() => import("./pages/Users"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen text-purple-700 text-lg font-semibold">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ourblog" element={<OurBlog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Login />} />
        </Routes>

        {/* ✅ ToastContainer should be inside Router but outside Routes */}

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          toastStyle={{
            backgroundColor: "#7C3AED", // Tailwind's purple-600
            color: "#fff",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
          }}
          progressStyle={(toast) => ({
            background:
              toast?.type === "success"
                ? "linear-gradient(to right, #A855F7, #7C3AED)"
                : toast?.type === "error"
                ? "linear-gradient(to right, #F87171, #DC2626)"
                : "linear-gradient(to right, #9CA3AF, #6B7280)",
          })}
        />
      </Suspense>
    </Router>
  );
}

export default App;
