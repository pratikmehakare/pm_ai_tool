import { useState } from "react";
import { MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! How can I help you today? Use either the project issue key or project name to get better insights" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setHistory((prev) => [...prev, input]);
    setInput("");
    setLoading(true);
    setHistoryIndex(-1);

    try {
      const res = await fetch(`${process.env.REACT_APP_CHATBOT_API_URL}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      const botMessage = { role: "bot", content: data.response };
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
    if (e.key === "Enter") {
      sendMessage();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 font-sans">
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
                className={classNames(
                  "p-2 rounded-xl max-w-[90%] transition-all duration-300",
                  {
                    "bg-blue-100 self-end text-blue-900 text-right": msg.role === "user",
                    "bg-gray-100 self-start text-gray-800 text-left": msg.role === "bot",
                  }
                )}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="text-gray-400 text-left animate-pulse">Typing...</div>
            )}
          </div>

          <div className="p-2 border-t border-gray-200 flex items-center gap-2 bg-white">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-md text-sm shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 text-white p-3 rounded-full shadow-xl transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    </div>
  );
}
