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
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="h-[95%] lg:w-[60%] w-[95%] bg-white shadow-xl rounded-2xl border border-indigo-100 flex flex-col">
        
        {/* Messages */}
        <div
          ref={divref}
          className="flex-1 w-full px-4 py-6 flex flex-col overflow-y-auto space-y-4"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {index % 2 === 0 ? (
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <RiGeminiLine
                    className="text-green-500 mt-1"
                    size={28}
                  />
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    {msg}
                  </div>
                </div>
              ) : (
                <div className="bg-indigo-500 text-white font-medium p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                  {msg}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-gray-600 animate-pulse">
              <RiGeminiLine className="text-green-500" size={26} />
              <span>Thinking...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-gray-200 p-4 flex items-center space-x-3 bg-white rounded-b-2xl">
          <input
            type="text"
            className="flex-1 h-12 rounded-full bg-gray-50 border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Write a message..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              message && !loading
                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!message || loading}
            onClick={handleSendMessage}
          >
            <IoIosSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
