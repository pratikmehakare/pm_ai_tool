import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80">
      {isOpen && (
        <div className="absolute bottom-14 right-2 bg-white border border-gray-300 rounded-2xl shadow-lg w-80 h-96 flex flex-col overflow-hidden animate-fadeIn">
          <div className="bg-gray-600 text-white px-4 py-2 font-semibold">
            Chatbot
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-sm text-gray-700">Hi! How can I help you today?</p>
          </div>
          <div className="p-2 border-t flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-2 py-1 border rounded-l-md focus:outline-none text-sm"
            />
            <button className="bg-gray-600 text-white px-3 py-1 rounded-r-md hover:bg-blue-700 text-sm">
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
