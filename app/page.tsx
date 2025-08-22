"use client";
import { RiGeminiLine } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import {useState,useEffect, use} from "react"
import axios from "axios";
export default function Home() {
  const [message,setMessage]=useState("")
  const [messages,setMessages]=useState<string[]>([])
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    setMessages(["welcome to djaouad tech chatbot ,  how can I help you?"])
  }, []);
  const handleSendMessage = async () => {
    if (!message) return;

    const userMessage = message;
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/ai", { question: userMessage });
      const botMessage = response.data.answer;
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
      console.log("Bot response:", botMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

return(
  <div className="h-full w-full flex items-center justify-center lg:texl:md text-sm lg:bg-none bg-blue-50 ">
    <div className="h-[90%] lg:w-[60%] w-[90%] lg:bg-blue-50 bg-none rounded-lg border-none  lg:border-2 border-indigo-200  flex flex-col-reverse items-center  py-4">
      <div className="w-[95%] flex items-center justify-between h-[5%]">
      <input type="text" className="w-[80%] h-full rounded-lg bg-white border-2 border-indigo-200 p-1" placeholder="Write a message ..." onChange={(e) => setMessage(e.target.value)} value={message} />
        <button className={`lg:h-12 hover:scale-125 ease-linear duration-200 lg:w-12 h-10 w-10  rounded-full border-indigo-200 bg-gray-100 border-2 flex items-center disabled:cursor-not-allowed justify-center ${message && `opacity-70`} ${loading && `scale-75 opacity-50`}`} disabled={!message || loading} onClick={handleSendMessage}>
          <IoIosSend className={`text-indigo-500 cursor-pointer `} size={30}/>
        </button>
      
      </div>
        <div className={`w-full py-5  ${loading ? "block" : "hidden"}`}>   <div className="py-5 max-w-[80%] min-w-[20%]">
          <RiGeminiLine className="text-indigo-500 cursor-pointer" size={30}/>
          <div className="text-gray-700 ml-2 indent-[10%] Whitespace-normal animate-pulse">Wait for the answer </div>
        </div>
        </div>

      <div className="h-[90%] w-[98%] px-[3%] flex flex-col overflow-y-auto">

        {messages.map((msg, index) => (
          <div key={index} className={`w-full py-5 flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
            <div className={`py-5 max-w-[80%] min-w-[20%] ${index % 2 === 0 ? "" : "order-2"}`}>
              {index % 2 === 0 ? (
                <>
                  <RiGeminiLine className="text-indigo-500 cursor-pointer" size={30} />
                  <div className="text-gray-700 ml-2 indent-[1%] Whitespace-normal pl-6">{msg}</div>
                </>
              ) : (
                <div className="text-gray-700 ml-2 Whitespace-normal bg-blue-200 p-5 border-2 border-white rounded-2xl rounded-tr-none">{msg}</div>
              )}
            </div>
          </div>
        ))}

         {/* <div className="w-full py-5 flex justify-end">   <div className="py-5 max-w-[80%] min-w-[20%]">
          
          <div className="text-gray-700 ml-2  Whitespace-normal bg-blue-200 p-5 border-2 border-white rounded-2xl rounded-tr-none ">Hello Mohamed how can i help you Hello Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you Mohamed how can i help you</div>
        </div>
        </div> */}

        
      </div>
    </div>
  </div>
)
}
