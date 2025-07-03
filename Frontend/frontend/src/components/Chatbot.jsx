import React, { useState } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react"; // icons

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/chat", { query });
      setResponse(res.data.response || "No answer available.");
    } catch (err) {
      setResponse("❌ Error: Could not fetch response.");
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-teal-900 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chatbot Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 max-w-[90%] bg-white shadow-lg border border-gray-300 rounded-lg z-50 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 bg-teal-600 text-white rounded-t-lg">
            <h2 className="text-lg font-semibold">💬 Chatbot</h2>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 overflow-y-auto max-h-64">
            <p className="mb-2 text-sm text-gray-700">Ask anything about your groups or expenses.</p>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleQuery()}
              placeholder="Type your question..."
              className="w-full border rounded px-3 py-2 text-sm mb-2"
            />
            <button
              onClick={handleQuery}
              className="w-full bg-teal-600 text-white rounded py-2 text-sm hover:bg-teal-700"
              disabled={loading}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
            {response && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-sm whitespace-pre-line">
                🤖 {response}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
