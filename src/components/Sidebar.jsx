import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBlog,
  FaUsers,
  FaSignOutAlt,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/Auth/authSlice";
import { toast } from "react-toastify";
import { closeMenu } from "../Slices/menu/MenuSlice";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get user
  const { user } = useSelector((state) => state.auth);
  const loggedUser = user || JSON.parse(localStorage.getItem("user"));
  const { isOpen } = useSelector((state) => state.menu);
  const baseLinkClass =
    "flex items-center py-2 px-4 rounded-lg transition-all duration-200 text-sm text-brand-500 hover:text-white";
  const activeLinkClass =
    "bg-gradient-to-r from-purple-400 to-purple-600 text-white";

  const iconClass = "mr-3";

  const handleLogout = () => {
    // 1️⃣ Clear Redux state too
    dispatch(logout());
    localStorage.removeItem("token");
    // 2️⃣ Show logout message
    toast.success("Logout successful!");

    // 3️⃣ Redirect to login after short delay
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <aside
      className={`
    fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-5 z-[50]
    flex flex-col justify-between
    transform transition-transform duration-300 ease-in-out z-[100] lg:translate-x-0 md:translate-x-0 
    ${isOpen ? "translate-x-0 ;" : "-translate-x-full "}
  `}
  
    >
      {/* Close Button (Mobile Only) */}
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-purple-600 md:hidden"
        onClick={() => dispatch(closeMenu())}
      >
        <FaTimes size={22} />
      </button>

      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
               <img
          src="/logo-purple.png"
          alt="Blog Logo"
           className="h-12 w-auto"
        />
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {loggedUser?.role === "admin" && (
          <NavLink
            to="/dashboard"
             onClick={() => dispatch(closeMenu())}
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive
                  ? activeLinkClass
                  : "hover:bg-purple-400 hover:from-purple-400 hover:to-purple-600"
              }`
            }
          >
            <FaTachometerAlt className={iconClass} />
            Dashboard
          </NavLink>
        )}
        {loggedUser?.role === "admin" && (
          <NavLink
            to="/blogs"
            onClick={() => dispatch(closeMenu())}
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive
                  ? activeLinkClass
                  : "hover:bg-purple-400 hover:from-purple-400 hover:to-purple-600"
              }`
            }
          >
            <FaBlog className={iconClass} />
            Blog Posts
          </NavLink>
        )}

        <NavLink
          to="/myblogs"
           onClick={() => dispatch(closeMenu())}
          className={({ isActive }) =>
            `${baseLinkClass} ${
              isActive
                ? activeLinkClass
                : "hover:bg-purple-400 hover:from-purple-400 hover:to-purple-600"
            }`
          }
        >
          <FaBlog className={iconClass} />
          My Blog Posts
        </NavLink>

        {loggedUser?.role === "admin" && (
          <NavLink
            to="/users"
             onClick={() => dispatch(closeMenu())}
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive
                  ? activeLinkClass
                  : "hover:bg-purple-400 hover:from-purple-400 hover:to-purple-600"
              }`
            }
          >
            <FaUsers className={iconClass} />
            Users
          </NavLink>
        )}

        {/* <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${baseLinkClass} ${
              isActive
                ? activeLinkClass
                : "hover:bg-purple-400 hover:from-purple-400 hover:to-purple-600"
            }`
          }
        >
          <FaCog className={iconClass} />
          Settings
        </NavLink> */}

        <NavLink
          to="/home"
          className={({ isActive }) =>
            `${baseLinkClass} ${
              isActive
                ? activeLinkClass
                : "hover:bg-purple-400 hover:from-purple-400 hover:to-purple-600"
            }`
          }
        >
          <FaHome className={iconClass} />
          Home
        </NavLink>
      </nav>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="flex items-center py-2 px-4 rounded-lg text-sm text-brand-500 hover:text-white transition-all duration-200 hover:bg-red-600"
      >
        <FaSignOutAlt className={iconClass} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
