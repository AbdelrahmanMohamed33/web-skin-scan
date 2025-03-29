import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaUpload, FaPaperPlane } from "react-icons/fa";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Domain from "../constants/Domain";
import { getId, getToken } from "../Helper/Tokens";
import img from "../assets/img/doc2.jpg";

const ChatModal = ({ doctor, onClose, recipientId = "0fb93761-de73-4823-9585-e29319be4331" }) => {
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
          `${Domain.resoureseUrl()}/api/Chat/history?sen=${getId(getToken("access"))}&reci=${recipientId}`,
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
      .withUrl(`${Domain.resoureseUrl()}/chatHub?uid=${getId(getToken("access"))}`, {
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
      if (message.recipientId === getId(getToken("access"))) {
        setMessages((prev) => [...prev, message]);
      }
    });

    newConnection.on("receiveFile", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => newConnection.stop();
  }, [recipientId]);


  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (selectedFile) {
      await handleSendImageMessage();
    } else if (newMessage.trim()) {
      await handleSendTextMessage();
    }
  };

  const handleSendTextMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: getId(getToken("access")),
      recipientId,
      type: "text",
      content: newMessage.trim(),
    };

    await connection.invoke("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  const handleSendImageMessage = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("senderId", getId(getToken("access")));
    formData.append("receiverId", recipientId);

    try {
      const response = await fetch(`${Domain.resoureseUrl()}/api/Chat/file-upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken("access")}` },
        body: formData,
      });

      const responseText = await response.text();
      const data = JSON.parse(responseText);

      if (!data.fileUrl) throw new Error("No file URL returned from server.");

      const messageData = {
        senderId: getId(getToken("access")),
        recipientId,
        type: "image",
        fileUrl: data.fileUrl,
      };

      await connection.invoke("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);

      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error("❌ Error sending image:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // ✅ عرض المعاينة
    }
  };

  return (
    <div className="fixed bottom-0 right-5 m-4 flex items-end justify-end z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <FaTimes size={20} />
        </button>

        <div className="flex items-center mb-4">
          <img src={img} alt={doctor?.name} className="w-16 h-16 rounded-full mr-4" />
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">{doctor?.name}</h3>
            <p className="text-green-500">online</p>
          </div>
        </div>

        <div className="h-48 overflow-y-auto p-2 border rounded-lg bg-gray-100">
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-2 ${message.senderId === getId(getToken("access")) ? "justify-end" : "justify-start"}`}>
              <div className={` rounded-lg shadow-md max-w-xs ${message.senderId === getId(getToken("access")) ? "bg-blue-500 text-white " : "bg-green-100 text-gray-900 py-1 px-1"}`}>
                {message.type === "image" && message.fileUrl ? (
                  <img
                    src={message.fileUrl?.startsWith("http") ? message.fileUrl : `${Domain.resoureseUrl()}${message.fileUrl || ""}`}
                    alt="Sent file"
                    className="w-22 h-20 rounded-lg shadow-md px-1 py-1 bg-blue-500 "
                  />
                ) : null}
                {message.content && message.content.trim() !== "" ? (
                  <p className="bg-blue-600 px-3 py-2 rounded-lg">{message.content}</p>
                ) : null}
              </div>
            </div>
          ))}
          <div ref={chatEndRef}></div> 
        </div>

        {/* Input Section */}
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
              className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Write your message..."
            />
          )}

          <label htmlFor="fileInput" className="text-gray-400 hover:text-gray-700 font-bold py-2 px-2 rounded cursor-pointer flex items-center">
            <FaUpload className="mr-2" />
          </label>
          <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />

          <button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
