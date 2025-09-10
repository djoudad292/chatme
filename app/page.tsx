"use client";
import { RiGeminiLine } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Home() {
  const divref = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      "👋 Welcome! You can chat normally, or use commands like /history <topic>, /info <topic>, or /news to explore.",
    ]);
  }, []);

  useEffect(() => {
    if (divref.current) {
      divref.current.scrollTo({
        top: divref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message) return;

    const userMessage = message;
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post("https://chatbot-temp.onrender.com/ai", {
        question: userMessage,
      });
      const botMessage = response.data.answer;
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center text-sm bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="h-[95%] lg:w-[60%] w-[90%] rounded-lg border border-indigo-200 bg-white shadow-md flex flex-col-reverse items-center py-10">
        
        {/* Input */}
        <div className="w-[95%] flex items-center justify-between h-[2.5rem]">
          <input
            type="text"
            className="w-[80%] h-full rounded-full bg-gray-50 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 p-2 px-3"
            placeholder="Write a message ..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            className={`lg:h-12 lg:w-12 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              message && !loading
                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } ${loading && "scale-90 opacity-50"}`}
            disabled={!message || loading}
            onClick={handleSendMessage}
          >
            <IoIosSend size={22} />
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="w-full py-5 flex items-center space-x-2 text-gray-500 animate-pulse">
            <RiGeminiLine className="text-indigo-500" size={28} />
            <span>Thinking...</span>
          </div>
        )}

        {/* Messages */}
        <div
          ref={divref}
          className="h-[90%] w-[98%] px-[3%] flex flex-col overflow-y-auto"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`w-full py-2 flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[75%] ${
                  index % 2 === 0 ? "bg-gray-100 text-gray-800" : "bg-indigo-500 text-white"
                } p-3 rounded-2xl shadow-sm ${
                  index % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none"
                }`}
              >
                {index % 2 === 0 && (
                  <RiGeminiLine className="inline-block text-indigo-500 mr-2" size={20} />
                )}
                {msg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
