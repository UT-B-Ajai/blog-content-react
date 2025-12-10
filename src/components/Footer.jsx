import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white pt-10 pb-6 mt-0">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo + About */}
        <div>
          <img src="/logo-white.png" alt="Logo" className="h-16 mb-4" />
          <p className="text-gray-200 text-sm">
            Blogging platform built to share ideas, stories & knowledge with the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-3 border-b border-purple-300 pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/home" className="hover:text-gray-200">Home</Link></li>
            <li><Link to="/ourblog" className="hover:text-gray-200">Our Blog</Link></li>
            <li><Link to="/contact" className="hover:text-gray-200">Contact Us</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-bold text-lg mb-3 border-b border-purple-300 pb-1">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-gray-200">Help Center</Link></li>
            <li><Link to="#" className="hover:text-gray-200">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-gray-200">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-3 border-b border-purple-300 pb-1">
            Follow Us
          </h3>
          <div className="flex items-center space-x-4 mt-3">
            <a href="#" className="p-2 bg-purple-800 rounded-full hover:bg-purple-600 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="p-2 bg-purple-800 rounded-full hover:bg-purple-600 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="p-2 bg-purple-800 rounded-full hover:bg-purple-600 transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="p-2 bg-purple-800 rounded-full hover:bg-purple-600 transition">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="mt-8 border-t border-purple-400 pt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} Blog Platform. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
