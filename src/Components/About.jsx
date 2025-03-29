import React from 'react';
import img from "../assets/img/about1.jpg";

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">About Us</h1>
        
        {/* Image */}
        <div className="flex justify-center">
          <img src={img} alt="About Us"  className="w-4/5 md:w-3/5 h-auto rounded-lg shadow-lg" />
        </div>
        
        {/* Sections */}
        <div className="mt-8 space-y-6">
          <Section
            title="Skin Scan"
            text="Bacterial skin infections occur when bacteria enter the skin, either from an outside source or because they are present on the skin. They can enter the skin through a hair follicle or after a wound. So we developed this program to identify skin infections and types of wounds."
          />
          <Section
            title="Our Mission"
            text="Our mission is to leverage cutting-edge technology to make dermatological care accessible and efficient for everyone. We aim to empower individuals with tools that can provide early and accurate diagnosis of skin conditions, ultimately improving health outcomes."
          />
          <Section
            title="Our Vision"
            text="Our vision is to lead the future of dermatological care by continuously integrating advanced technology and artificial intelligence to offer accessible, accurate, and personalized skin health solutions. We strive to be a global leader in dermatology, ensuring that everyone has the tools they need to diagnose and manage their skin health efficiently, ultimately reducing skin disease burdens worldwide."
          />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, text }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default AboutUs;
