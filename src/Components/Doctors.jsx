import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaWhatsapp, FaCalendarAlt, FaComment, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import loading from "../assets/img/load.jpg";
import img from "../assets/img/doc2.jpg";
import Domain from "../constants/Domain";
import ChatModal from "./Chat";

const LoadingIcon = () => (
  <div className="flex justify-center items-center h-screen">
    <img src={loading} className="w-16 h-16" alt="Loading..." />
  </div>
);

const doctorsEndpoint = `${Domain.resoureseUrl()}/api/Specialization/get-all-docs`;

const Doctors = () => {
  const slider = useRef(null);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatDoctor, setChatDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(doctorsEndpoint);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setDoctors(data.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const handleChatClick = (doctorId) => {
    setChatDoctor(doctors.find((doc) => doc.id === doctorId));
    setIsChatOpen(true);
  };

  if (isLoading) return <LoadingIcon />;
  if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    <div className="min-h-screen flex flex-col px-5 lg:px-32 pt-16">
      <div className="text-center mb-10 mt-16">
        <h1 className="text-4xl font-semibold">Our Doctors</h1>
        <div className="flex justify-center gap-5 mt-4">
          <button className="bg-[#d5f2ec] text-blue-400 px-4 py-2 rounded-lg active:bg-[#ade9dc]" onClick={() => slider.current.slickPrev()}>
            <FaArrowLeft size={25} />
          </button>
          <button className="bg-[#d5f2ec] text-blue-400 px-4 py-2 rounded-lg active:bg-[#ade9dc]" onClick={() => slider.current.slickNext()}>
            <FaArrowRight size={25} />
          </button>
        </div>
      </div>

      <div className="w-full">
        <Slider ref={slider} {...settings}>
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="h-[350px] text-black rounded-xl shadow-lg cursor-pointer relative transition-transform duration-300 hover:scale-105"
            >
              <img src={img} alt={`Dr. ${doctor.name}`} className="h-100 w-full rounded-t-xl object-cover" />
              <div className="flex flex-col items-center p-4">
                <h2 className="font-semibold text-xl">Dr. {doctor.name}</h2>
                <div className="flex  mt-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`text-lg ${i < 4 ? "fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
                <div className="flex  gap-4 mt-3 absolute bottom-4 right-4">
                 
                  <button onClick={() => navigate(`/appointment/${doctor.id}`)}>
                    <FaCalendarAlt size={20} className="text-blue-500" />
                  </button>
                  <button onClick={() => handleChatClick(doctor.id)}>
                    <FaComment size={20} className="text-blue-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {isChatOpen && <ChatModal doctor={chatDoctor} onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default Doctors;
