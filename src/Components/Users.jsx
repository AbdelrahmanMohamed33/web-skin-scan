import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaArrowLeft } from "react-icons/fa";
import ChatModal from "./Chat";
import img from "../assets/img/doc5.jpg";
import Domain from "../constants/Domain";
import { getId } from "../Helper/Tokens";

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
      const response = await fetch(`${Domain.apiUrl()}/api/Auth/all`);
      const data = await response.json();
      if (response.ok) {
        const filtered = data.filter((user) => user.userName && user.id !== getId() && !user.userName.startsWith("doc"));
        setUsers(filtered);
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = (user) => {
    setChatUser(user);
    setIsChatOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center px-4 py-6 sm:px-6">
      <div className="flex items-center w-full max-w-4xl mt-10 sm:mt-24">
        <button onClick={() => navigate(-1)} className="text-blue-700 text-3xl">
          <FaArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800 mx-auto">User List</h1>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-12 space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium">Users, please wait...</p>
      </div>
      ) : (
        <div className="mt-5 w-full max-w-4xl flex flex-col gap-6">
          {!users.length ? (
            <p className="text-center text-gray-500 text-lg">No users found.</p>
          ) : (
            users.map((user) => (
              <UserCard key={user.id} user={user} onChatClick={handleChatClick} />
            ))
          )}
        </div>
      )}

      {isChatOpen && chatUser && (
        <ChatModal doctor={chatUser} recipientId={chatUser.id} onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
};

const UserCard = ({ user, onChatClick }) => (
  <div className="bg-white p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md hover:shadow-lg transition-shadow">
    <div>
      <h2 className="text-lg font-semibold text-gray-800">{user.userName}</h2>
    </div>
    <div className="flex items-center gap-4">
      <img src={img} alt={user.userName} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-blue-400" />
      <button
        onClick={() => onChatClick(user)}
        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 shadow-md self-start sm:self-auto"
      >
        <FaComments size={20} />
      </button>

    </div>
  </div>
);

export default Users;
