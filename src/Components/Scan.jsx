import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../assets/img/scanoo.jpg";
import load from "../assets/img/load.jpg";
import { isTokenExpired, getToken } from "../Helper/Tokens";
import Domain from "../constants/Domain";

const Scan = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [precessImage, setPrecessImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate();

  // Server response
  const [nameRes, setNameRes] = useState("");
  const [descriptionRes, setDescriptionRes] = useState("");
  const [preventionsRes, setPreventionsRes] = useState([]);
  const [imageRes, setImageRes] = useState("");
  const [riskRes, setRiskRes] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPrecessImage(file);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    if (isTokenExpired(getToken("access"))) {
      navigate("/login");
      return;
    }

    if (!selectedModel) {
      setErrorMessage("Please select a model to upload.");
      setIsLoading(false);
      return;
    }

    const urlMap = {
      Burn: `${Domain.resoureseUrl()}/api/Wound/upload-burn`,
      Type: `${Domain.resoureseUrl()}/api/Wound/upload-type`,
      SkinDisease: `${Domain.resoureseUrl()}/api/Wound/upload-skin`
    };

    try {
      const formData = new FormData();
      formData.append("file", precessImage, "image.jpg");
      const url = urlMap[selectedModel];
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${getToken("access")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const data = response.data.data || {};
        if (data) { // Assuming your API returns this flag
          setNameRes(data.name || "No name available");
          setDescriptionRes(data.description || "No description available");
          setPreventionsRes(data.preventions || []);
          setImageRes(data.image || "");
          setRiskRes(data.risk || "No risk data available");
        } else {
         // console.log(response.data.data);
         // console.log(response.status);
          setErrorMessage("This image is not a wound. Please upload a clear image of a wound.");
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.data?.message || error.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (isTokenExpired(getToken("access"))) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 gap-5 ">
      <div className="w-full lg:w-3/4 space-y-4 mt-28">
        <h1 className="text-3xl font-bold text-center lg:text-start mb-4 text-blue-900 ">
          Scan Your Disease
        </h1>

        {!uploadedImage ? (
          <div className="mt-16">
            <label
              htmlFor="file-upload"
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer "
            >
              Choose image...
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        ) : (
          ""
        )}

        {uploadedImage && (
          <>
            <button
              onClick={handleUpload}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-6"
            >
              Upload
            </button>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Select Model:</h2>
              <div className="flex gap-4 mt-2">
                {["Burn", "Type", "Skin Disease"].map((model) => (
                  <button
                    key={model}
                    onClick={() => setSelectedModel(model)}
                    className={`py-2 px-4 rounded ${selectedModel === model ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  >
                    {model} Model
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}
      </div>

      <div className="w-full lg:w-3/4">
        {uploadedImage ? (
          <img
            className="rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            style={{ width: "400px", height: "400px" }}
            src={uploadedImage}
            alt="Uploaded"
          />
        ) : (
          <img className="rounded-lg" src={img} alt="Default" 
          style={{ width: "500px", height: "400px" }}
          />
        )}
      </div>

      {/* Centered content for results */}
      <div className="flex justify-center items-center min-h-[200px] p-8" style={{ marginTop: "-100px" }}>
        <div className="text-center">
          {isLoading ? (
            <div className="mt-16">
              <img width={100} height={100} src={load} alt="Loading" />
            </div>
          ) : (
            <div className="space-y-4 bg-gray-200 px-4 py-4 rounded mt-36">
              {uploadedImage && !nameRes && (
                <h2 className="text-xl font-semibold text-gray-500">Upload to show details</h2>
              )}
              {nameRes && (
                <>
                  <h2 className="text-2xl font-semibold text-blue-600 ">Name: {nameRes || "No name available"}</h2>
                  <p className="text-lg">{descriptionRes || "No description available"}</p>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600">Preventions</h3>
                    <ul className="list-disc list-inside">
                      {preventionsRes.length > 0 ? (
                        preventionsRes.map((prevention, index) => (
                          <li key={index}>{prevention}</li>
                        ))
                      ) : (
                        <li>No preventions available</li>
                      )}
                    </ul>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600">Risk Level</h3>
                  <p className="text-lg">Risk Level: {riskRes || "No risk data available"}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scan;
