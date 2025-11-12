import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt ,FaPowerOff} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/Auth/authSlice";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 Get user from Redux or fallback to localStorage
  const { user } = useSelector((state) => state.auth);
  const loggedUser = user || JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful!");
    navigate("/login");
  };

  const linkClass = (path) =>
    `block py-2 px-4 rounded-md font-medium transition ${
      location.pathname === path
        ? "text-purple-600 bg-purple-100"
        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
    }`;

  return (
    <nav className="bg-white border-b-2 border-purple-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/home"
          className="text-2xl font-bold text-purple-600"
          onClick={() => setMenuOpen(false)}
        >
          MyBlogSite
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/home" className={linkClass("/home")}>
            Home
          </Link>
          <Link to="/contact" className={linkClass("/contact")}>
            Contact Us
          </Link>

          {/* 🔹 Show username and logout when logged in */}
          {loggedUser ? (
            <div className="flex items-center space-x-4 ml-6">
              <span className="text-gray-700 font-medium">
                👋 {loggedUser.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition"
              >
                <FaPowerOff size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-purple-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-purple-100 shadow-lg">
          <Link
            to="/home"
            className={linkClass("/home")}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className={linkClass("/contact")}
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>

          {/* Mobile: Show user info */}
          {loggedUser ? (
            <>
              <div className="px-4 py-2 text-gray-700 font-medium border-t border-purple-100">
                👋 {loggedUser.name}
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-purple-50 border-t border-purple-100"
              >
                <FaPowerOff size={16} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 text-purple-600 border-t border-purple-100 hover:bg-purple-50"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
