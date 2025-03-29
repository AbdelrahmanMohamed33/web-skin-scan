import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterDoctors = () => {
  const [formData, setFormData] = useState({
    phone: "",
    location: "",
    specialities: "",
    education: "",
    certification: "",
    experience: "",
    fees: "",
    availableDates: "", });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-24 ">
      <div className="w-full max-w-xxl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4">
          Skin Scan
        </h1>
        <p className="text-center text-gray-600 mb-4">More details required</p>

        {/* Input Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}> {/* Added onSubmit */}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 bg-blue-100 rounded-lg focus:outline-none"
          >
            <option value="">Location</option>
            <option value="cairo">Cairo</option>
            <option value="zagazig">Zagazig</option>
            <option value="giza">Giza</option>
            <option value="mansoura">Mansoura</option>
            <option value="alex">Alex</option>
            <option value="sina">Sina</option>
          </select>

          <input
            type="text"
            name="specialities"
            placeholder="Specialities"
            value={formData.specialities}
            onChange={handleChange}
            className="w-full p-3 bg-blue-100 rounded-lg focus:outline-none"
          />

          <input
            type="text"
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-3 bg-blue-100 rounded-lg focus:outline-none"
          />

          <input
            type="text"
            name="certification"
            placeholder="Certification"
            value={formData.certification}
            onChange={handleChange}
            className="w-full p-3 bg-blue-100 rounded-lg focus:outline-none"
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 bg-blue-100 rounded-lg focus:outline-none"
          />

          <input
            type="text"
            name="fees"
            placeholder="Fees"
            value={formData.fees}
            onChange={handleChange}
            className="w-full p-3 bg-blue-100 rounded-lg focus:outline-none"
          />

          {/* Date Picker Field */}
          <div className="relative">
            <input
              type="text"
              name="availableDates"
              placeholder="Your available dates"
              value={formData.availableDates}
              onChange={handleChange}
              className="w-full p-3 bg-blue-100 rounded-lg focus:outline-none"
            />
            <FaCalendarAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDoctors;