import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../Helper/Tokens";
import { Link } from "react-router-dom";
import load from "../assets/img/load.jpg";
import Domain from "../constants/Domain";

const LoadingIcon = () => (
  <div className="loader flex justify-center items-center h-screen" style={{ paddingBottom: "150px" }}>
    <img src={load} className="w-16 h-16" alt="Loading..." />
  </div>
);

export default function History({ onHistoryDataChange }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${Domain.resoureseUrl()}/api/Wound/get-all`, // Fixed template literal
          {
            headers: {
              Authorization: `Bearer ${getToken("access")}`, // Fixed template literal
            },
          }
        );
        if (response.status === 200 ) {
          setHistory(response.data.data);
          setLoading(false);
          onHistoryDataChange(response.data.data);
        }
      } catch (error) {
        setLoading(false);
        setError(""); // Set error message
      }
    }
    fetchData();
  }, [onHistoryDataChange]);

  const getImageType = (base64String) => {
    if (base64String.startsWith("/9j/")) {
      return "jpeg"; // JPEG image
    } else if (base64String.startsWith("iVBORw0K")) {
      return "png"; // PNG image
    } else if (base64String.startsWith("R0lGOD")) {
      return "gif"; // GIF image
    }
    return "jpeg"; 
  };

  return (
    <div className="container mx-auto p-4 pt-40 mb-40">
  {loading ? (
    <LoadingIcon />
  ) : error ? (
    <p className="text-red-500">{error}</p>
  ) : history.length === 0 ? (
    <div className="text-center text-gray-500 text-lg mb-32">History is empty</div>
  ) : (
    <>
      {/* Show only when history exists */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 text-center md:text-left mb-10 md:mb-16">
        Recent Analyses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {history.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
              <p className="text-gray-600 py-1">Date: {item.addedDate}</p>
              <Link
                to={`/details/${item.id}`}
                className="inline-block mt-4 bg-blue-900 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
              >
                View Details
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg shadow"
                src={`data:image/${getImageType(item.file)};base64,${item.file}`}
                alt={`Image for ${item.name}`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )}
</div>

  );
}
