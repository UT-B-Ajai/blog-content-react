import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaCog,
  FaUserShield,
  FaSignOutAlt,
  FaSignInAlt,
  FaBell,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/Auth/authSlice";
import { toast } from "react-toastify";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  pushNotification,
} from "../Slices/Notifications/notificationSlice";
import socket from "../socket";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef();
  const settingsRef = useRef();

  const { list = [], unreadCount = 0 } = useSelector(
    (state) => state.notifications
  );
  const loggedUser =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));

  /* Fetch notifications */
  useEffect(() => {
    if (loggedUser?.id) dispatch(fetchNotifications());
  }, []);

  /* Socket listener for notifications */
  useEffect(() => {
    if (!loggedUser?.id) return;
    socket.emit("register", loggedUser.id);

    const handleNotification = (data) => {
      dispatch((dispatch, getState) => {
        const exists = getState().notifications.list.some(
          (n) => n._id === data._id
        );
        if (!exists) dispatch(pushNotification(data));
      });
    };

    socket.on("push_notification", handleNotification);
    return () => socket.off("push_notification", handleNotification);
  }, [loggedUser]);

  /* Close dropdowns on outside click */
useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(e.target)
    ) ;
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const markAsRead = (notification) => {
    if (!notification.read_status)
      dispatch(markNotificationRead(notification._id));
    navigate(`/blog/${notification.blog_id}`);
    setMenuOpen(false);
    setShowNotifications(false);
  };

  const handleMarkAll = async () => {
    await dispatch(markAllNotificationsRead());
    dispatch(fetchNotifications());
    setShowNotifications(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
    setMenuOpen(false);
  };

  const linkClass = (path) =>
    `block px-4 py-2 rounded hover:bg-purple-50 transition ${
      location.pathname === path
        ? "bg-purple-100 font-semibold"
        : "text-purple-600"
    }`;

  return (
    <nav className="sticky top-0 z-50">
      {/* Desktop Header */}
      <div className="hidden md:flex bg-purple-600 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
          {/* Logo */}
          <Link
            to="/home"
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <img src="/logo-white.png" className="h-14 w-auto" alt="Logo" />
            PRIME BLOG
          </Link>

          {/* Desktop Menu */}
          <div className="flex items-center space-x-6">
            <Link to="/home" className="hover:underline">
              Home
            </Link>
            <Link to="/ourblog" className="hover:underline">
              Our Blog
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>

            {loggedUser && (
              <>
                {/* Notifications */}
                <div ref={notificationRef} className="relative">
                  <button
                    className="relative"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNotifications(!showNotifications);
                    }}
                  >
                    <FaBell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div
                      className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl border z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center px-4 py-3 border-b">
                        <span className="font-semibold text-purple-600">
                          Notifications
                        </span>

                        <button
                          className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAll();
                          }}
                        >
                          Mark all read
                        </button>
                      </div>

                      <div className="max-h-80 overflow-y-auto">
                        {list.length === 0 ? (
                          <p className="py-4 text-center text-gray-500 flex items-center justify-center gap-2">
                            <FaBell size={20} className="text-gray-400" /> No
                            Notifications
                          </p>
                        ) : (
                          list.map((n) => (
                            <div
                              key={n._id}
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(n);
                              }}
                              className={`px-4 py-3 border-b cursor-pointer hover:bg-purple-50 transition ${
                                !n.read_status ? "bg-purple-50" : ""
                              }`}
                            >
                              <p className="font-semibold text-gray-950 text-sm">
                                {n.title}
                              </p>
                              <p className="text-xs text-gray-600">{n.body}</p>
                              <span className="text-[10px] text-gray-400">
                                {new Date(n.createdAt).toLocaleString()}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Settings */}
                <div ref={settingsRef} className="relative">
                  <button onClick={() => setShowSettings(!showSettings)}>
                    <FaCog size={20} />
                  </button>
                  {showSettings && (
                    <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-xl border z-50">
                      <Link
                        to={
                          loggedUser.role === "admin"
                            ? "/dashboard"
                            : "/myblogs"
                        }
                        className="flex items-center gap-2 px-4 py-3 hover:bg-purple-50 text-purple-600 rounded"
                      >
                        <FaUserShield />{" "}
                        {loggedUser.role === "admin"
                          ? "Admin Panel"
                          : "User Panel"}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-purple-50 text-purple-600 rounded"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {!loggedUser && (
              <Link to="/login" className="flex items-center gap-2 text-white">
                <FaSignInAlt /> Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="flex md:hidden justify-between items-center bg-purple-600 text-white px-6 py-4 shadow">
        <Link to="/home" className="flex items-center gap-2 text-xl font-bold">
          <img src="/logo-white.png" className="h-10 w-auto" alt="Logo" />
          PRIME BLOG
        </Link>
        {/* <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button> */}
        {!menuOpen && (
          <button onClick={() => setMenuOpen(true)} className="text-white">
            <FaBars size={24} />
          </button>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 shadow-lg transform transition-transform z-50 md:hidden
    ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b bg-purple-600 text-white">
          <Link
            to="/home"
            className="flex items-center gap-2 text-xl font-bold"
            onClick={() => setMenuOpen(false)}
          >
            <img src="/logo-white.png" className="h-10 w-auto" alt="Logo" />
            PRIME BLOG
          </Link>
          <button onClick={() => setMenuOpen(false)}>
            <FaTimes size={24} className="text-white" />
          </button>
        </div>

        <div className="flex flex-col mt-0 space-y-2 px-4 py-2 bg-white text-purple-600 h-full">
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

          {loggedUser && (
            <>
              {/* ================= Notification Toggle Button ================= */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifications(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-purple-50"
              >
                <FaBell /> Notifications{" "}
                {unreadCount > 0 && (
                  <span className="bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div
                  className="fixed md:absolute top-0 md:top-auto right-0  h-full md:h-auto w-full md:w-80  bg-white shadow-xl  border z-50 md:rounded-lg animate-slideDown md:animate-none"
                  onClick={(e) => e.stopPropagation()}
                  ref={notificationRef}
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center px-4 py-3 border-b bg-purple-600 md:bg-white">
                    <span className="font-semibold text-white md:text-purple-600 text-lg md:text-base">
                      Notifications
                    </span>

                    <button
                      className="text-xs bg-white md:bg-purple-100 text-purple-600 px-2 py-1 rounded"
                      onClick={handleMarkAll}
                    >
                      Mark all read
                    </button>
                  </div>

                  {/* LIST */}
                  <div className="max-h-[85vh] md:max-h-80 overflow-y-auto px-1">
                    {list.length === 0 ? (
                      <p className="py-10 text-center text-gray-500 flex items-center justify-center gap-2 text-sm">
                        <FaBell size={20} className="text-gray-400" /> No
                        Notifications
                      </p>
                    ) : (
                      list.map((n) => (
                        <div
                          key={n._id}
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(n);
                          }}
                          className={`px-4 py-3 border-b cursor-pointer hover:bg-purple-50 transition ${
                            !n.read_status ? "bg-purple-50" : ""
                          }`}
                        >
                          <p className="font-semibold text-gray-950 text-sm">
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-600">{n.body}</p>
                          <span className="text-[10px] text-gray-400">
                            {new Date(n.createdAt).toLocaleString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Close button visible only on mobile */}
                  <button
                    className="
        md:hidden 
        fixed bottom-4 right-4 
        bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg
      "
                    onClick={() => setShowNotifications(false)}
                  >
                    Close
                  </button>
                </div>
              )}

              {/* ================= User Panel ================= */}
              <Link
                to={loggedUser.role === "admin" ? "/dashboard" : "/myblogs"}
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-purple-50 mt-2"
                onClick={() => setMenuOpen(false)}
              >
                <FaUserShield />
                {loggedUser.role === "admin" ? "Admin Panel" : "User Panel"}
              </Link>

              {/* ================= Logout Button ================= */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded hover:bg-purple-50 mt-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}

          {!loggedUser && (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-purple-50 mt-2"
              onClick={() => setMenuOpen(false)}
            >
              <FaSignInAlt /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
