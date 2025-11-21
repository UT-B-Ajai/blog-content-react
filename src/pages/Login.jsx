import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Slices/Auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { user,loading, success, error, token } = useSelector((state) => state.auth);  
  console.log(useSelector((state) => state.auth),"userstate");
  
   const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    // Dispatch login API
    dispatch(loginUser(form));
    
  };

  useEffect(() => {
    
    if (success && token) {
      toast.success("Login successful!");
         setTimeout(() => {
    
        navigate("/home");
    
    }, 1500);
    }

    if (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  }, [success, error, token, navigate]);

  return (
    <div className="min-h-screen flex bg-purple-50">
      {/* Left side image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-purple-200">
        <img
          src="/login.png"
          alt="Blog Illustration"
          className="w-full h-[250px] sm:h-[200px] md:h-[300px] lg:h-[300px] xl:h-[400px] object-cover rounded-l-3xl"
        />
      </div>

      {/* Right side login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md border-2 border-purple-300">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-purple-700 mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-purple-700 mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:from-purple-600 hover:to-purple-800"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-purple-700 text-sm mt-3">
              Don’t have an account?{" "}
              <a href="/register" className="text-purple-500 hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
