import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Contact from "../models/Contact";
import { getToken, isTokenExpired, getName } from "../Helper/Tokens";
import { jwtDecode } from "jwt-decode";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // ✅ متغير للتحكم في القائمة

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const openForm = () => {
    setShowForm(true);
    setMenu(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const token = getToken("access");
  const username = isTokenExpired(token) ? null : getName(token);
  let isDoctor = false;

  if (token) {
    const decoded = jwtDecode(token);
    isDoctor = decoded?.roles === "Doc";
  }

  return (
    <div className="fixed w-full z-10 text-white">
      <div>
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 shadow-md bg-blue-900">
          <div className="flex flex-row items-center cursor-pointer">
            <Link to="/">
              <h1 className="text-2xl font-extrabold">Skin Scan</h1>
            </Link>
          </div>
          <nav className="hidden lg:flex flex-row items-center text-lg font-medium gap-6">
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")}>Home</NavLink>
            <NavLink to="/scan" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")}>Scan</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")}>About Us</NavLink>
            <NavLink to="/blogs" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")}>Browse Disease</NavLink>

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 hover:text-hoverColor transition-all cursor-pointer focus:outline-none"
              >
                <span>More</span> <ChevronDown size={18} />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 flex flex-col bg-white text-black rounded-md mt-2 shadow-lg w-40 border border-gray-200 z-20">
                  <NavLink to="/history" className="hover:bg-gray-100 px-4 py-2" onClick={closeDropdown}>History</NavLink>
                  <NavLink to="/clinics" className="hover:bg-gray-100 px-4 py-2" onClick={closeDropdown}>Clinics</NavLink>
                  {isDoctor ? (
                    <NavLink to="/users" className="hover:bg-gray-100 px-4 py-2" onClick={closeDropdown}>Users</NavLink>
                  ) : (
                    <NavLink to="/doctors" className="hover:bg-gray-100 px-4 py-2" onClick={closeDropdown}>Doctors</NavLink>
                  )}
                  <NavLink to="/feedback" className="hover:bg-gray-100 px-4 py-2" onClick={closeDropdown}>Feedback</NavLink>
                </div>
              )}
            </div>

            {isTokenExpired(token) ? (
              <Link to="/login" className="bg-blue-900 text-white rounded-lg hover:text-hoverColor transition-all cursor-pointer px-4 py-2 ml-6">Login</Link>
            ) : (
              <Link to="/account" className="bg-blue-900 text-white rounded-lg hover:text-hoverColor transition-all cursor-pointer px-4 py-2 ml-0">
                {username}
              </Link>
            )}
          </nav>

          {showForm && <Contact closeForm={closeForm} />}
          <div className="lg:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${menu ? "translate-x-0" : "-translate-x-full"} lg:hidden flex flex-col absolute bg-blue-900 text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}>
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/scan" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")} onClick={closeMenu}>Scan</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")} onClick={closeMenu}>About Us</NavLink>
          <NavLink to="/blogs" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")} onClick={closeMenu}>Browse Disease</NavLink>
          <NavLink to="/clinics" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")} onClick={closeMenu}>Clinics</NavLink>
          {isDoctor ? (
            <NavLink to="/users" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")} onClick={closeMenu}>Users</NavLink>
          ) : (
            <NavLink to="/doctors" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all cursor-pointer")} onClick={closeMenu}>Doctors</NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
