import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getToken } from "../Helper/Tokens";
import load from "../assets/img/load.jpg";
import Domain from "../constants/Domain";

const LoadingIcon = () => (
  <div className="flex flex-col justify-center items-center py-12 space-y-4 mb-32 ">
    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mt-32"></div>
    <p className="text-gray-700 font-medium "> please wait...</p>
  </div>
);

export default function Details() {
  const { id } = useParams();
  const [nameRes, setNameRes] = useState("");
  const [descriptionRes, setDescriptionRes] = useState("");
  const [preventionsRes, setPreventionsRes] = useState([]);
  const [imageRes, setImageRes] = useState("");
  const [riskRes, setRiskRes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${Domain.resoureseUrl()}/api/Wound/get-id?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken("access")}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data.data;
          setDescriptionRes(data["description"]);
          setNameRes(data["name"]);
          setPreventionsRes(data["preventions"]);
          setImageRes(data["image"]);
          setRiskRes(data["risk"]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const getImageType = (base64String) => {
    if (base64String.startsWith("/9j/")) return "jpeg";
    if (base64String.startsWith("iVBORw0K")) return "png";
    if (base64String.startsWith("R0lGOD")) return "gif";
    return "jpeg";
  };

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="container mx-auto p-4 pt-40">
          <h1 className="text-4xl font-semibold text-center lg:text-start mb-8 text-blue-800">
            More Details...
          </h1>

          {/* Two-column layout */}
          <div className="p-10 bg-gray-100 rounded-md flex flex-col lg:flex-row items-center lg:items-start">
            
            {/* Left side - Text Content */}
            <div className="w-full lg:w-1/2">
              <p className="mb-2">
                <strong className="text-blue-500">Name:</strong> {nameRes}
              </p>
              <p className="mb-2">
                <strong className="text-blue-500">Description:</strong> {descriptionRes}
              </p>
              <p className="mb-2"> 
                <strong className="text-blue-500">Risk:</strong> {riskRes}
              </p>
              <div className="mt-2">
                <strong className="text-blue-500">Preventions:</strong>
                <ul className="list-disc ml-4">
                  {preventionsRes.map((prevention, idx) => (
                    <li key={idx}>{prevention}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              {imageRes && (
                <img
                  src={`data:image/${getImageType(imageRes)};base64,${imageRes}`}
                  alt="Burn Image"
                  className="w-80 h-80 object-cover rounded-md shadow-md"
                />
              )}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-10 text-center mb-10 flex justify-center gap-4">
          <Link to="/doctors" className="text-blue-900 hover:underline rounded py-2 px-4 bg-green-500" >
              Ask a Doctor
           </Link>
            
          </div>
        </div>
      )}
    </>
  );
}
