import React from "react";

const Header = () => {
  return (
  <header className="bg-white dark:bg-white-900   py-4 px-6 flex justify-between items-center border-b-2  border-gray-200">
      <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Admin</span>
      
    <img class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="/docs/images/people/profile-picture-5.jpg" alt="Bordered avatar" />

      </div>
    </header>
  );
};

export default Header;
