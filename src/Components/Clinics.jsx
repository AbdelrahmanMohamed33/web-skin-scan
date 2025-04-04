import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Domain from "../constants/Domain";
import { FaStar } from "react-icons/fa";
import img from "../assets/img/doc2.jpg";
import { getToken, isTokenExpired } from "../Helper/Tokens";

const Clinics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clinicsList, setClinicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ التحقق من التوكن عند تحميل الصفحة
  useEffect(() => {
    if (isTokenExpired(getToken("access"))) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchClinicsByLocation = async (location) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${Domain.resoureseUrl()}/api/pharmacy/${location}`);
      if (!response.ok) throw new Error("Failed to fetch clinics");

      const data = await response.json();
      setClinicsList(data);
    } catch (error) {
      console.error("Error:", error);
      setClinicsList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") fetchClinicsByLocation(searchQuery.trim());
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mb">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-900 mt-16">Clinics</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-3 mb-6">
        <input
          type="text"
          className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search by location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-900 transition">
          Search
        </button>
      </form>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center text-lg font-semibold text-gray-500">Loading...</div>
      ) : clinicsList.length === 0 ? (
        <div className="text-center text-gray-500 mb-36 mt-24">No clinics found.</div>
      ) : (
        <ul className="space-y-6">
          {clinicsList.map((clinic, index) => (
            <ClinicCard key={index} clinic={clinic} navigate={navigate} />
          ))}
        </ul>
      )}
    </div>
  );
};

const ClinicCard = ({ clinic, navigate }) => {
  return (
    <div className="border rounded-xl p-5 shadow-lg flex flex-wrap items-center bg-white hover:shadow-2xl transition">
      {/* Clickable Image */}
      <img
        src={img}
        alt="Clinic"
        className="w-20 h-20 rounded-full object-cover mr-5 cursor-pointer"
        onClick={() => navigate(`/clinicdetails/${clinic.id}`)}
      />
      
      {/* Clinic Details & Rating */}
      <div className="flex-1 min-w-25">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          Dr. {clinic.name}
        </h2>
        <p className="text-gray-500 flex items-center">
          <span className="material-icons text-red-500 mr-2">location_on</span>
          {clinic.location || "Unknown location"}
        </p>
      </div>

      {/* Rating Stars */}
      <div className="flex items-center text-yellow-500 mt-2 sm:mt-0 sm:ml-4">
        <div className="flex text-sm sm:text-base">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`text-lg ${i < 4 ? "fill-current" : "text-gray-300"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clinics;
