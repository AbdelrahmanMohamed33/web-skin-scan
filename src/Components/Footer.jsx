import React from "react";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <div className="text-white rounded-t-3xl mt-8 md:mt-0 bg-blue-900 w-full relative bottom-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-xl pb-4">Skin Scan</h1>
          <p className=" text-sm">
            Our team of dedicated doctors, each specializing in unique fields
            such as orthopedics, cardiology, pediatrics, neurology, dermatology,
            and more.
          </p>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">About Us</h1>
          <nav className=" flex flex-col gap-2">
            <Link to="about" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer">
              About
            </Link>
            <Link to="services" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer">
              Browse Disease
            </Link>
            <Link to="doctors" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer">
              Doctors
            </Link>
          </nav>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Browse Disease</h1>
          <nav className=" flex flex-col gap-2">
            <Link to="blogs" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer">
            preventions
            </Link>
            <Link to="blogs" spy={true} smooth={true} duration={500} className=" hover:text-hoverColor transition-all cursor-pointer">
            description
            </Link>
         
          </nav>
        </div>
        <div className=" w-full md:w-1/4">
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <Link to="/" spy={true} smooth={true} duration={500}>
              SkinScan@care.com
            </Link>
            <Link to="/" spy={true} smooth={true} duration={500}>
              +201278464197
            </Link>
          </nav>
        </div>
      </div>
      <div>
        <p className=" text-center py-4">
          Copyright © 2025 - All right reserved By
          <span className=" text-hoverColor"> GP-2501</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
