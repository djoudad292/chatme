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
    setMessages(["• Type anything to chat normally  /history <topic> → short history + fun fact   /info <topic> → quick info in bullet points   /news → today’s top headlines    Try these examples:- /history Napoleon - /info JavaScript "]);
  }, []);

  // 👇 this runs every time messages change
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
    <div className="h-full w-full flex items-center justify-center text-sm bg-blue-50">
      <div className="h-[95%] lg:w-[60%] w-[90%] bg-none rounded-lg border-none lg:border-2 border-indigo-200 flex flex-col-reverse items-center py-10">
        {/* Input */}
        <div className="w-[95%] flex items-center justify-between h-[7%] ">
          <input
            type="text"
            className="w-[80%] h-full rounded-4xl bg-white border-2 border-green-300 p-1 px-3"
            placeholder="Write a message ..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            className={`lg:h-12 hover:scale-125 ease-linear duration-200 lg:w-12 h-10 w-10 rounded-full border-indigo-200 bg-gray-100 border-2 flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
              message && "opacity-70"
            } ${loading && "scale-75 opacity-50"}`}
            disabled={!message || loading}
            onClick={handleSendMessage}
          >
            <IoIosSend className="text-green-500" size={30} />
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="w-full py-5">
            <div className="py-5 max-w-[80%] min-w-[20%]">
              <RiGeminiLine className="text-green-500" size={30} />
              <div className="text-gray-700 ml-2 indent-[10%] animate-pulse">
                Wait for the answer...
              </div>
            </div>
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
              className={`w-full py-5 flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`py-5 max-w-[80%] min-w-[20%] ${
                  index % 2 === 0 ? "" : "order-2"
                }`}
              >
                {index % 2 === 0 ? (
                  <>
                    <RiGeminiLine
                      className="text-green-500 cursor-pointer"
                      size={30}
                    />
                    <div className="text-gray-700 ml-2 pl-6">{msg}</div>
                  </>
                ) : (
                  <div className="text-white font-bold bg-indigo-400 lg:p-4 p-3 border-2 border-blue-200 rounded-2xl rounded-tr-none">
                    {msg}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
