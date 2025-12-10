import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash, FaBars, FaSearch } from "react-icons/fa";
import { openMenu } from "../Slices/menu/MenuSlice";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.menu);
   const { user } = useSelector((state) => state.auth);
    const loggedUser = user || JSON.parse(localStorage.getItem("user"));
  console.log(loggedUser,"loggedUser");
  
  return (
    <div className="flex items-center justify-between p-4 bg-white  sticky top-0 z-40 w-full justify-center md:justify-end lg:justify-end">
      <button
        className="md:hidden text-purple-600"
        onClick={() => dispatch(openMenu())}
      >
        <FaBars size={22} />
      </button>
      {/* Admin Info Section */}
    <div className="flex items-center justify-between  bg-white sticky top-0 z-40 w-full">

      {/* LEFT SIDE → Admin Panel Title */}
    <span className="text-gray-800 text-sm md:text-base font-bold invisible sm:visible">
   👋 Welcome {loggedUser?.name}
    </span>



  {/* RIGHT SIDE → Admin + Profile */}
  <div className="flex items-center space-x-3">
    <span className="text-gray-600 text-sm md:text-base font-medium">
     {loggedUser?.role === "admin" ? "Admin" : "User"}
    </span>
    <img
      className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 object-cover"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      alt="User avatar"
    />
  </div>

</div>

    </div>
  );
};

export default Header;
