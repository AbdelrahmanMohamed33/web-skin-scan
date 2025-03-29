import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaArrowLeft } from "react-icons/fa";
import ChatModal from "./Chat"; 
import img from "../assets/img/doc5.jpg";
import load from "../assets/img/load.jpg";
import Domain from "../constants/Domain";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${Domain.resoureseUrl()}/api/Auth/all`);
      const data = await response.json();
      if (response.ok) {
  
        const doctors = data.filter(user => user.userName && !user.userName.startsWith("doc")); 
        setUsers(doctors);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = (user) => {
    setIsChatOpen(true);
    setChatUser(user);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <div className="flex items-center w-full max-w-4xl mt-24">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-700 text-3xl hover:text-blue-900 transition-colors"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 mx-auto ">User List</h1>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="mt-10 text-gray-600 text-lg animate-pulse">
          <h5 className="mb-8 py-8">Loading users...</h5> 
          <img src={load} className="w-16 h-16 mt-8" alt="Loading..." />
        </div>
      ) : (
        <div className="mt-5 w-full max-w-4xl flex flex-col gap-6">
          {!users?.length ? (
            <p className="text-center text-gray-500 text-lg">No users found.</p>
          ) : (
            users.map((user) => <UserCard key={user.id} user={user} onChatClick={handleChatClick} />)
          )}
        </div>
      )}

      {/* Chat Modal */}
      {isChatOpen && (
        <ChatModal doctor={chatUser} recipientId={chatUser?.id} onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
};

const UserCard = ({ user, onChatClick }) => {
  return (
    <div className="bg-white p-6 rounded-xl flex items-center justify-between shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* User Info */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{user.userName}</h2>
        <p className="text-sm text-gray-500">ID: {user.id}</p>
      </div>

      {/* Image & Chat Button */}
      <div className="flex items-center gap-4">
        <img
          src={img}
          alt={user.userName}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
        />
        <button
          onClick={() => onChatClick(user)}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          <FaComments size={22} />
        </button>
      </div>
    </div>
  );
};

export default Users;