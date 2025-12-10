import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-10">
          We'd love to hear from you! Send us a message and we’ll get back to you soon.
        </p>

        {/* GRID - Form Left / Map Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Contact Form */}
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

          {/* Google Map */}
          <div className="w-full h-[350px] md:h-full rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              className="border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.2498748532958!2d80.24525507430263!3d12.955856215224824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d290dd1c013%3A0xec3581c0c88c89ce!2sSwipewire%20Technologies!5e0!3m2!1sen!2sin!4v1764578403451!5m2!1sen!2sin"
            ></iframe>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
