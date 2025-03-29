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
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mt-16">
        <img src={img} alt="Doctor" className="w-32 h-32 rounded-full mx-auto" />
        <h1 className="text-2xl font-bold mt-4">Dr. {doctor.name}</h1>
        <p className="text-gray-500">{doctor.specialization}</p>
      </div>

      <div className="mt-6 p-16 border rounded-lg bg-white shadow-md ">
        <p className="mb-2 "><strong className="text-blue-800 mr-2 ">Name:  </strong> {doctor.name}</p>
        <p className="mb-2 "><strong className="text-blue-800 mr-2">Address:</strong> {doctor.location}</p>
        <p className="mb-2 "><strong className="text-blue-800 mr-2">Availability:</strong> <span className="text-green-500">Start</span> {doctor.start} :: <span className="text-red-500">Close</span> {doctor.close} </p>
        <p className="mb-2 "><strong className="text-blue-800 mr-2">Fees:</strong> ${doctor.fees}</p>
      </div>
      <div className="flex justify-center items-center mt-4"><button className="  bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900">
        Book Appointment
      </button>
      </div>
      
    </div>
  );
};

export default Clinicdetails;
