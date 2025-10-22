import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaBlog, 
  FaUsers, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";

const Sidebar = () => {
  const baseLinkClass = "flex items-center py-2 px-4 rounded-lg transition-all duration-200 text-sm text-brand-500 hover:text-white";
  const activeLinkClass = "bg-gradient-to-r from-purple-400 to-purple-600 text-white";

  const iconClass = "mr-3";

  return (
    <aside className="bg-white dark:bg-white-900 shadow-md w-64 min-h-screen flex flex-col justify-between p-5">
      
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <svg
          className="w-32 h-auto"
          viewBox="0 0 200 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="200" height="50" rx="10" fill="url(#grad1)" />
          <text x="50%" y="50%" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
            LOGO
          </text>
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7F00FF"/>
              <stop offset="1" stopColor="#E100FF"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseLinkClass} ${isActive ? activeLinkClass : "hover:bg-purple-400 hover:from-purple-400 hover:to-purple-600"}`
          }
        >
          <FaTachometerAlt className={iconClass} />
          Dashboard
        </NavLink>

        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            `${baseLinkClass} ${isActive ? activeLinkClass : "hover:bg-purple-400 hover:from-purple-400 hover:to-purple-600"}`
          }
        >
          <FaBlog className={iconClass} />
          Blog Posts
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `${baseLinkClass} ${isActive ? activeLinkClass : "hover:bg-purple-400 hover:from-purple-400 hover:to-purple-600"}`
          }
        >
          <FaUsers className={iconClass} />
          Users
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${baseLinkClass} ${isActive ? activeLinkClass : "hover:bg-purple-400 hover:from-purple-400 hover:to-purple-600"}`
          }
        >
          <FaCog className={iconClass} />
          Settings
        </NavLink>
      </nav>

      {/* Logout button */}
      <button className="flex items-center py-2 px-4 rounded-lg text-sm text-brand-500 hover:text-white transition-all duration-200 hover:bg-red-600">
        <FaSignOutAlt className={iconClass} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
