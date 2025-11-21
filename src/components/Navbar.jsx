import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaPowerOff,
  FaBars,
  FaTimes,
  FaCog,
  FaUserShield,
  FaSignOutAlt,
  FaSignInAlt ,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/Auth/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Get user
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
        : "text-white hover:text-purple-600 hover:bg-purple-50"
    }`;

  return (
    <nav className="bg-purple-600 border-b-2  shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/home"
          className="text-2xl font-bold text-white"
          onClick={() => setMenuOpen(false)}
        >
          MyBlogSite
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/home" className={linkClass("/home")}>
            Home
          </Link>

          <Link to="/ourblog" className={linkClass("/ourblog")}>
            Our Blog
          </Link>

          <Link to="/contact" className={linkClass("/contact")}>
            Contact Us
          </Link>

          {/* Settings Menu (only if logged in) */}
          {loggedUser && (
            <div className="relative ml-6">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:text-white transition"
              >
                <FaCog size={20} />
              </button>

              {showSettings && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 border z-50">
                  {/* Admin Panel */}
                  <Link
                    to="/dashboard"
                    onClick={() => setShowSettings(false)}
                    className="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100"
                  >
                    <FaUserShield size={18} className="text-purple-600" />
                    Admin Panel
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      setShowSettings(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    <FaSignOutAlt size={18} className="text-red-600" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {!loggedUser && (
          <Link
          to="/login"
          className="flex items-center gap-2 text-white px-3 py-1"
        >
          <FaSignInAlt className="text-lg" />
          Login
        </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-purple-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
            to="/ourblog"
            className={linkClass("/ourblog")}
            onClick={() => setMenuOpen(false)}
          >
            Our Blog
          </Link>

          <Link
            to="/contact"
            className={linkClass("/contact")}
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>

          {/* Mobile Admin + Logout */}
          {loggedUser ? (
            <>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/admin");
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50"
              >
                <FaUserShield size={18} className="text-purple-600" />
                Admin Panel
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-purple-50 border-t border-purple-100"
              >
                <FaSignOutAlt size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 text-purple-600 hover:bg-purple-50"
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
