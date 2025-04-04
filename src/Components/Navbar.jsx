import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import Contact from "../models/Contact";
import { getToken, isTokenExpired, getName } from "../Helper/Tokens";
import { jwtDecode } from "jwt-decode";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

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
        {/* Desktop Navbar */}
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 shadow-md bg-blue-900">
          <Link to="/">
            <h1 className="text-2xl font-extrabold">Skin Scan</h1>
          </Link>

          <nav className="hidden lg:flex flex-row items-center text-lg font-medium gap-6">
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")}>Home</NavLink>
            <NavLink to="/scan" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")}>Scan</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")}>About Us</NavLink>
            <NavLink to="/blogs" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")}>Browse Disease</NavLink>

            {/* More Dropdown */}
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center gap-1 hover:text-hoverColor transition-all">
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

            {/* Account/Login Button (Desktop) */}
            {isTokenExpired(token) ? (
              <Link to="/login" className="bg-blue-900 text-white rounded-lg hover:text-hoverColor transition-all px-4 py-2 ml-6">Login</Link>
            ) : (
              <Link to="/account" className="bg-blue-900 text-white rounded-lg hover:text-hoverColor transition-all px-4 py-2 ml-0 flex items-center gap-2">
                <AiOutlineUser size={22} /> {username}
              </Link>
            )}
          </nav>

          {showForm && <Contact closeForm={() => setShowForm(false)} />}
          
          {/* Mobile Menu Button */}
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
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/scan" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")} onClick={closeMenu}>Scan</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")} onClick={closeMenu}>About Us</NavLink>
          <NavLink to="/blogs" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")} onClick={closeMenu}>Browse Disease</NavLink>
          <NavLink to="/history" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")} onClick={closeMenu}>History</NavLink>
          <NavLink to="/clinics" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")} onClick={closeMenu}>Clinics</NavLink>
          <NavLink to="/feedback" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")} onClick={closeMenu}>Feedback</NavLink>

          {isDoctor ? (
            <NavLink to="/users" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")} onClick={closeMenu}>Users</NavLink>
          ) : (
            <NavLink to="/doctors" className={({ isActive }) => (isActive ? "text-hoverColor" : "hover:text-hoverColor transition-all")} onClick={closeMenu}>Doctors</NavLink>
          )}

          {/* Account/Login Button (Mobile) */}
          {isTokenExpired(token) ? (
            <NavLink to="/login" className="hover:text-hoverColor transition-all" onClick={closeMenu}>Login</NavLink>
          ) : (
            <NavLink to="/account" className="hover:text-hoverColor transition-all flex items-center justify-center gap-2" onClick={closeMenu}>
              <AiOutlineUser size={24} /> {username}
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
