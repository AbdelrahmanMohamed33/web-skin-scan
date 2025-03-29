import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react'; 
import SuccessI from '../assets/success.json';

const AppointmentBooked = ({ doctorId }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate.replace('/appointments');
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div className="flex-grow flex items-center justify-center">
        <Lottie animationData={SuccessI} style={{ width: 1000, height: 1000 ,marginTop:-170}} />
      </div>
      <h1 className="text-2xl font-bold text-center mb-16 text-green-600 " style={{marginTop:-270}}>Successfully Booked</h1>
      <div className="w-full max-w-md mx-auto">
        <button
          onClick={handleButtonClick}
          className="w-full bg-blue-600 mb-16 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition duration-300"
        >
          Your Appointment
        </button>
      </div>
    </div>
  );
};
export default AppointmentBooked;


