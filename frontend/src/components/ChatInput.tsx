import React, { useState } from "react";
import { useRouter } from "next/router";


interface ChatInputProps {
  onSendQuery: (query: string) => void;
}
const ChatInput: React.FC<ChatInputProps> = ({ onSendQuery }) => {
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (query.trim()) {
      onSendQuery(query.trim());
      setQuery(""); // Clear input after sending
    }
  };

  return (
    <div style={{ display: "flex", marginTop: "1rem" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type your query..."
        style={{
          flex: 1,
          padding: "0.5rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          marginLeft: "0.5rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;

