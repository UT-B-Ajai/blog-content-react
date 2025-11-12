import React from "react";

const Header = () => {
  return (
    <header className="flex justify-end items-center w-full">
      {/* Admin Info Section */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-600 text-sm md:text-base font-medium">Admin</span>
        <img
          className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 object-cover"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="User avatar"
        />
      </div>
    </header>
  );
};

export default Header;
