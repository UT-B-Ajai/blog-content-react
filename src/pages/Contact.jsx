import React from "react";
import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-6">Contact Us</h2>
        <p className="text-gray-600 mb-10">
          We'd love to hear from you! Send us a message and we’ll get back to you soon.
        </p>

        <form className="bg-white shadow-md rounded-xl p-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          ></textarea>
          <button className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white py-3 rounded-md hover:from-purple-500 hover:to-purple-700 transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
