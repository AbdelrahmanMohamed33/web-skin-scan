import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import SuccessI from "../assets/success.json";

const AppointmentBooked = ({ doctorId }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-center">
        <Lottie animationData={SuccessI} className="w-96 h-96" />
      </div>
      <h1 className="text-2xl font-bold text-center text-green-600 mt-4">
        Successfully Booked
      </h1>
      <div className="w-full max-w-md mx-auto mt-6">
        <button
          onClick={handleButtonClick}
          className="w-full bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-300"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AppointmentBooked;
