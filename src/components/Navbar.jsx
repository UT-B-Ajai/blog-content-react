import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b-2 border-purple-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Site Name */}
        <Link to="/home" className="text-2xl font-bold text-purple-600">
          MyBlogSite
        </Link>

        {/* Nav Links */}
        <div className="space-x-6">
          <Link
            to="/home"
            className={`font-medium ${
              location.pathname === "/home"
                ? "text-purple-600"
                : "text-gray-600 hover:text-purple-500"
            }`}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className={`font-medium ${
              location.pathname === "/contact"
                ? "text-purple-600"
                : "text-gray-600 hover:text-purple-500"
            }`}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
