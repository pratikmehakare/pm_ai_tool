import { useState } from "react";
import { MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      //console.log("api",process.env.REACT_APP_CHATBOT_API_URL)
      const res = await fetch(
        `${process.env.REACT_APP_CHATBOT_API_URL}/chatbot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: input }),
        }
      );

      const data = await res.json();
      const botMessage = { role: "bot", content: data.response };
      //console.log("res", data);
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80">
      {isOpen && (
        <div className="absolute bottom-14 right-2 bg-white border border-gray-300 rounded-2xl shadow-lg w-80 h-96 flex flex-col overflow-hidden animate-fadeIn">
          <div className="flex justify-between bg-gray-600 text-white px-4 py-2 font-semibold">
            Chatbot
            <IconButton  onClick={() => setIsOpen(!isOpen)}   size="small" 
          sx={{
          position: 'absolute',
          top: 4,
          right: 8,
          }}> <CloseIcon/>
        </IconButton>

      </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm ${
                  msg.role === "user"
                    ? "text-right text-blue-600"
                    : "text-left text-gray-700"
                }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 text-left">Typing...</div>
            )}
          </div>
          <div className="p-2 border-t flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-2 py-1 border rounded-l-md focus:outline-none text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="bg-gray-600 text-white px-3 py-1 rounded-r-md hover:bg-blue-700 text-sm"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    </div>
  );
}
