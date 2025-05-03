import React, { useState } from 'react';
import axios from 'axios';
import Domain from "../constants/Domain";
import { getToken } from "../Helper/Tokens";
import { useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
  const [subject, setSubject] = useState('');
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = getToken("access");
      const response = await axios.post(
        `${Domain.resoureseUrl()}/api/FeedBack/add`,
        {
          Subject: subject,
          FeedBackContent: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Feedback sent successfully!');
        setErrorMessage('');
        setSubject('');
        setFeedback('');
      } else {
        setErrorMessage('Failed to submit feedback.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Page Title */}
      <h1 className="text-4xl font-semibold text-center text-blue-800 mb-6 mt-28">Feedback</h1>
      <h2 className="text-lg text-center text-gray-700 mb-8">
        We value your feedback! Please let us know your thoughts.
      </h2>

      {/* Feedback Form */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter subject"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none h-32"
            placeholder="Write your feedback here..."
          />
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-300"
          onClick={handleSubmit}
        >
          Submit Feedback
        </button>
        
        {/* Success & Error Messages */}
        {successMessage && <p className="mt-4 text-green-600 text-center">{successMessage}</p>}
        {errorMessage && <p className="mt-4 text-red-600 text-center">{errorMessage}</p>}
      </div>

      {/* Additional Info */}
      <p className="text-gray-600 text-sm mt-6 text-center">
        If you have any technical issues, please let us know.  
        <br />
        You can also access your program via web browser.
      </p>
    </div>
  );
};

export default FeedbackPage;
