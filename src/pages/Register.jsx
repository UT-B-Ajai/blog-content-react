import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", form);
  };

  return (
    <div className="min-h-screen flex bg-purple-50">
      {/* Left side image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-purple-200">
        <img
          src="https://images.unsplash.com/photo-1601597110908-d436bede51f0?auto=format&fit=crop&w=800&q=80"
          alt="Blog Illustration"
          className="w-full h-full object-cover rounded-l-3xl"
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

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200"
            >
              Register
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
