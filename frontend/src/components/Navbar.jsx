import React from "react";
import { LuListTodo } from "react-icons/lu";
import { IoIosHome } from "react-icons/io";
import { IoMdContact } from "react-icons/io";


const Navbar = () => {
  return (
    <nav className="flex justify-between bg-teal-900 text-white pl-3 ">
      <div className="logo">
        <span className="   mx-2 "><LuListTodo className="w-8 h-8" /></span>
      </div>
      <ul className="flex gap-8 mx-9 items-center">
        <li className="cursor-pointer hover:font-bold transition-all-duration-200 hover:bg-teal-600 px-4 py-1 rounded">
        <IoIosHome className="w-8 h-8 items-center" />
        </li>
        <li className="cursor-pointer hover:font-bold transition-all-duration-200 hover:bg-teal-600 px-4 py-1 rounded  ">
        <IoMdContact className="w-10 h-8"/>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
