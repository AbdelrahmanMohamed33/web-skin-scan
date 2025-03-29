import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken, isTokenExpired } from "../Helper/Tokens";
import Domain from "../constants/Domain";
import { useNavigate } from "react-router-dom";
import loading from "../assets/img/load.jpg";

const LoadingIcon = () => (
  <div className="loader flex justify-center items-center h-screen" style={{ paddingBottom: "150px" }}>
    <img src={loading} className="w-16 h-16" alt="Loading..." />
  </div>
);

const Diseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [diseaseDetails, setDiseaseDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (isTokenExpired(getToken("access"))) {
      navigate("/login");
      return;
    }
    const fetchDiseases = async () => {
      try {
        const token = getToken("access");
        if (!token) {
          setError(new Error("Authentication token not found."));
          return;
        }
        const response = await fetch(`${Domain.resoureseUrl()}/api/Disease/get-all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
             
        if (response.ok) { // Check for successful response (status 200-299)
          const data = await response.json();
          setDiseases(data.data);
        } else if (response.status === 401) {
          setError(new Error("Unauthorized: Invalid or missing access token."));
        } else {
          const errorMessage = `API request failed with status: ${response.status} ${response.statusText}`;
          setError(new Error(errorMessage));
          console.error("Error fetching diseases:", errorMessage);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  useEffect(() => {
    const fetchDiseaseDetails = async () => {
      try {
        if (!Array.isArray(diseases) || diseases.length === 0) return; //Improved check

        const promises = diseases.map((disease) =>
          axios.get(`${Domain.resoureseUrl()}/api/Disease/get-id?id=${disease.id}`, {
            headers: {
              Authorization: `Bearer ${getToken("access")}`,
            },
          })
        );

        const responses = await Promise.all(promises);
        const details = {};
        responses.forEach((response, index) => {
          if (response.status === 200) {
            details[diseases[index].id] = response.data.data;
          } else {
            console.error(
              `Error fetching details for disease ID ${diseases[index].id}: Status ${response.status}`,
              response.data // Include response data for better debugging
            );
            // Handle error more gracefully - provide default values or display an error message
            details[diseases[index].id] = { description: "Error loading description", preventions: [] };
          }
        });
        setDiseaseDetails(details);
      } catch (err) {
        console.error("Error fetching disease details:", err);
        // Handle the error appropriately, e.g., display an error message to the user.
      }
    };

    fetchDiseaseDetails();
  }, [diseases]);

  if (isLoading) {
    return <LoadingIcon />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center flex-col p-24">
      <h1 className="text-4xl font-semibold text-center lg:text-center mb-10">Browse Disease</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
        {diseases.length > 0 ? (
          diseases.map((disease) => (
            <div
              key={disease.id}
              className="bg-white p-4 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-xl font-bold text-gray-800 mr-10 mb-3">
                {disease.name ?? "Unknown Name"}
              </h2>
              <span className="ml-20 mt-2 font-semibold text-white px-4 py-1 rounded bg-blue-800">
                Description
              </span>
              <p className="mt-3 mb-4 ml-24 text-gray-700">
                {diseaseDetails[disease.id]?.description ?? "Unknown Description"}
              </p>
              <span className="ml-20 mt-2 font-semibold text-white px-4 py-1 rounded bg-blue-800">
                Preventions
              </span>
              {diseaseDetails[disease.id]?.preventions && diseaseDetails[disease.id].preventions.length > 0 ? (
                <ol className="mt-3 mb-4 ml-24 text-gray-700 list-decimal list-inside">
                  {diseaseDetails[disease.id].preventions.map((prevent, i) => (
                    <li key={`${disease.id}-prevent-${i}`} className="ml-4 text-gray-700">
                      {prevent}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-3 mb-4 ml-24 text-gray-700">No preventions found for this disease.</p>
              )}
            </div>
          ))
        ) : (
          <p>No diseases found.</p>
        )}
      </div>
    </div>
  );
};

export default Diseases;