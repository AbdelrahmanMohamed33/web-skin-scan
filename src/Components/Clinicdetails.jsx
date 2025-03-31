import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Domain from "../constants/Domain";
import img from "../assets/img/doc2.jpg";

const Clinicdetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClinicdetails = async () => {
      try {
        const response = await fetch(`${Domain.resoureseUrl()}/api/pharmacy/${id}`);
        if (!response.ok) throw new Error("Failed to fetch doctor details");
    
        const data = await response.json();
        console.log(data);
        setDoctor(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClinicdetails();
  }, [id]);

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
  if (!doctor) return <div className="text-center text-red-500">Doctor not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto  ">
      <div className="flex items-center bg-white shadow-md rounded-lg p-6 mt-24 py-16" >
        {/* ✅ الصورة على اليسار */}
        <img src={img} alt="Doctor" className="w-40 h-40 rounded-lg object-cover" />
  
        <div className="ml-6">
          <h1 className="text-2xl font-bold text-blue-900 ">Dr. {doctor.doctor.fullName}</h1>
          <p className="text-gray-500 mb-4">{doctor.doctor.email}</p>
          <p className="mt-2 mb-1"><strong className="text-blue-900 ">Clinic Name:</strong> {doctor.name}</p>
          <p className="mb-1"><strong className="text-blue-900  ">Address:</strong> {doctor.location}</p>
          <p className="mb-1">
            <strong className="text-blue-900 mb-2">Availability:</strong>
            <span className="text-green-500 mb-2"> Start</span> {doctor.start} ::
            <span className="text-red-500 mb-2"> Close</span> {doctor.close}
          </p>
          <p><strong className="text-blue-900">Fees:</strong> ${doctor.fees}</p>
        </div>
      </div>
  
      {/* زر الحجز */}
      <div className="flex justify-center items-center mt-6">
        <button className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800">
          Book Appointment
        </button>
      </div>
    </div>
  );
  
};

export default Clinicdetails;
