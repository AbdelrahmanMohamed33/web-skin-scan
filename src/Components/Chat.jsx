import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaUpload, FaPaperPlane } from "react-icons/fa";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Domain from "../constants/Domain";
import { getId, getToken } from "../Helper/Tokens";
import img from "../assets/img/doc2.jpg";

const ChatModal = ({ doctor, onClose, recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [connection, setConnection] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `${Domain.resoureseUrl()}/api/Chat/history?sen=${getId()}&reci=${recipientId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken("access")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();

    const newConnection = new HubConnectionBuilder()
      .withUrl(`${Domain.resoureseUrl()}/chatHub?uid=${getId()}`, {
        accessTokenFactory: () => getToken("access"),
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => console.log("Connected to SignalR"))
      .catch((err) => console.error("Connection failed:", err));

    newConnection.on("receiveMessage", (message) => {
      if (message.recipientId === getId()) {
        setMessages((prev) => [...prev, message]);
      }
    });

    newConnection.on("receiveFile", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => newConnection.stop();
  }, [recipientId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (selectedFile) {
      await handleSendImageMessage();
    } else if (newMessage.trim()) {
      await handleSendTextMessage();
    }
  };

  const handleSendTextMessage = async () => {
    const messageData = {
      senderId: getId(),
      recipientId,
      type: "text",
      content: newMessage.trim(),
    };

    await connection.invoke("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  const handleSendImageMessage = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("senderId", getId());
    formData.append("receiverId", recipientId);

    try {
      const response = await fetch(`${Domain.resoureseUrl()}/api/Chat/file-upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken("access")}` },
        body: formData,
      });

      const data = await response.json();
      if (!data.fileUrl) {
        throw new Error("No file URL returned from server.");
      }

      const messageData = {
        senderId: getId(),
        recipientId,
        type: "image",
        fileUrl: data.fileUrl,  // Make sure the URL is valid
      };

      await connection.invoke("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Error sending image:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
<div className="fixed bottom-0 right-0 left-0 sm:right-5 sm:left-auto m-2 flex items-end justify-center sm:justify-end z-50">

<div className="bg-white rounded-lg shadow-lg p-3 w-full max-w-md sm:max-w-sm relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <FaTimes size={20} />
        </button>

        <div className="flex items-center mb-4">
          <img src={img} alt={doctor?.name} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h3 className="text-lg font-medium">{doctor?.userName}</h3>
            <p className="text-green-500">online</p>
          </div>
        </div>

        <div className="h-60 overflow-y-auto p-4 border rounded-lg bg-gray-100">
          {messages.map((msg, i) => (
            <div key={i} className={`flex mb-2 ${msg.senderId === getId() ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-lg shadow-md max-w-xs ${msg.senderId === getId() ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-900 p-1 text-white"}`}>
                {msg.type === "image" && (
                  <img
                    src={msg.fileUrl?.startsWith("http") ? msg.fileUrl : `${Domain.resoureseUrl()}${msg.fileUrl}`}
                    alt="Sent"
                    className="w-22 h-20 rounded-lg"
                  />
                )}
                {msg.content?.trim() && <p className=" px-3 py-2 rounded-lg">{msg.content}</p>}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="flex mt-4 items-center">
          {previewUrl ? (
            <div className="flex items-center border rounded-lg p-2 bg-gray-200 w-full">
              <img src={previewUrl} alt="Preview" className="w-12 h-12 rounded-lg shadow-md mr-2" />
              <button onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="text-red-500 hover:text-red-700">
                <FaTimes size={20} />
              </button>
            </div>
          ) : (
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 text-sm"
              placeholder="Write your message..."
            />
          )}

          <label htmlFor="fileInput" className="text-gray-400 hover:text-gray-700 font-bold py-2 px-2 cursor-pointer">
            <FaUpload />
          </label>
          <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} hidden />

          <button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
