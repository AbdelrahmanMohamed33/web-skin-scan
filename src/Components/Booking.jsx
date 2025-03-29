import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API calls
import { FaSearch, FaStar } from 'react-icons/fa'; // For icons
import Domain from "../constants/Domain";
const Booking = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    callEndPoint(); // Fetch data when the page is loaded
  }, []);

  const callEndPoint = async () => {
    const url = `${Domain.resoureseUrl()}/api/Appointment?doctorId=132b32ee-ea98-4834-b851-1b7f52ba58ad`; // Replace with your API URL
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setAppointments(response.data.data); 
      } else {
        console.error("Error fetching appointments");
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (index) => {
    // Logic to cancel/remove appointment
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search previous appointments"
          className="w-full p-2 rounded-lg bg-gray-200 focus:outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h1 className="text-3xl font-bold mb-5">Your Appointments</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div>
          {appointments.filter(appointment => 
            appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((appointment, index) => (
            <AppointmentCard
              key={index}
              doctorName={`Dr. ${appointment.doctorName}`}
              specialization="Skin diseases"
              time={appointment.AppointmentDate}
              rating={4.9} // Replace with actual rating if available
              imageUrl="Images/doctor_Photo_b.jpg" // Adjust as necessary
              onDelete={() => handleDelete(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AppointmentCard = ({ doctorName, specialization, time, rating, imageUrl, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center">
      <img src={imageUrl} alt={doctorName} className="w-24 h-24 rounded-full" />
      <div className="flex-1 ml-4">
        <h2 className="font-bold text-lg">{doctorName}</h2>
        <p className="text-gray-700">{specialization}</p>
        <p className="text-gray-600">{time}</p>
      </div>
      <div className="flex items-center">
        <FaStar className="text-yellow-500" />
        <span className="ml-1">{rating}</span>
        <button 
          onClick={onDelete} 
          className="text-red-500 ml-4"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Booking;