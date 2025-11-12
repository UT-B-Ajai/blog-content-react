import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Slices/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Dispatch Redux action
    dispatch(registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    }));
  };

  useEffect(() => {
    if (success) {
       toast.success("Registration successful!");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex bg-purple-50">
      {/* Left side image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-purple-200">
        <img
          src="/register.png"
          alt="Blog Illustration"
          className="w-full sm:w-[400px] md:w-[550px] lg:w-[450px] xl:w-[450px] h-[300px] sm:h-[400px] md:h-[300px] lg:h-[400px] xl:h-[450px] object-cover rounded-l-3xl"
        />
      </div>

      {/* Right side register form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md border-2 border-purple-300">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
            Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-purple-700 mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-purple-700 mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-purple-700 mb-1 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-purple-700 mb-1 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
            </div>

            {/* Status Messages */}
            {loading && <p className="text-center text-purple-500">Registering...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200"
            >
              {loading ? "Please wait..." : "Register"}
            </button>

            {/* Login Link */}
            <p className="text-center text-purple-700 text-sm mt-3">
              Already have an account?{" "}
              <a href="/login" className="text-purple-500 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
