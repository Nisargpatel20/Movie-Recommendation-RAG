import React from "react";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

interface ChatHistoryProps {
  chatHistory: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory }) => {
  return (
    <div style={{ padding: "1rem", backgroundColor: "#f9f9f9", borderRadius: "4px", height: "400px", overflowY: "scroll" }}>
      {chatHistory.map((message, index) => (
        <div
          key={index}
          style={{
            marginBottom: "1rem",
            textAlign: message.isUser ? "right" : "left",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              backgroundColor: message.isUser ? "#007BFF" : "#e9ecef",
              color: message.isUser ? "#fff" : "#000",
              borderRadius: "12px",
              maxWidth: "60%",
            }}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
