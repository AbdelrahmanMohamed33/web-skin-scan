import React from "react";
import { Link } from "react-router-dom";
import About from './About';
import Blogs from './Blogs';
import Doctors from './Doctors';
import Feedback from './Feedback';
import Footer from './Footer';
import History from "./History";
import homeImage from "../assets/img/doc-Reg.jpg";  

const Home = () => {
  return (
    <div>
      <div 
        className="min-h-screen flex justify-start items-center bg-cover bg-center sm:bg-top relative"
        style={{ backgroundImage: `url(${homeImage})`, paddingTop: "250px" }} 
      >
        {/* تحسين التباين */}
        <div className="absolute inset-0 bg-black bg-opacity-40 sm:bg-opacity-20" />

        {/* المحتوى */}
        <section className="relative flex flex-col justify-start items-start h-screen px-4 sm:px-6 md:px-20 text-white">
          {/* صندوق النصوص */}
          <div className="max-w-lg  m-12 sm:m-8 md:m-2">
            <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-snug text-blue-900">
              Your Health Skin Care is <br /> 
              <span className="text-blue-400">Our Purpose</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg">
              We work to take care of your health and body. Our expert doctors provide the best health skin care services to ensure your well-being.
            </p>
            <Link to="/scan">
              <button className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
                Try Free Now 
              </button>
            </Link>
          </div>
        </section>
      </div>

      <History />
      <About />
      <Blogs />
      <Doctors />
      <Feedback />
      <Footer />
    </div>
  );
};

export default Home;
