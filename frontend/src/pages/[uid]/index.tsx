import React, { useState } from "react";
import ChatInput from "../../components/ChatInput";
import ChatHistory from "../../components/ChatHistory";
import { GetServerSideProps } from "next";
import { useEffect } from 'react';
// import '../../styles/globals.css';

import { useRouter } from "next/router";




interface ChatMessage {
  text: string;
  isUser: boolean;
}

interface props{
  uuid: string;
  query: string;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uid } = context.params || {};
 
  const query = "";
  
  return {
    props: {
      uuid: uid,
      query: query,
    },
  };
};



const QueryPage: React.FC<props> = ({uuid, query}) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const router = useRouter();
  
  const fetchData = async () => {
    try {
      // Make the API request to fetch the chatbot's response
      const response = await fetch(`http://localhost:8000/${uuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const history = data.response

      if (history != ""){
      history.forEach((item: { input: string; output: string }) => {
        const userInput = item.input;
        if (userInput) {
          setChatHistory((prev) => [...prev, { text: userInput, isUser: true }]);

        }
        const bot_Response = item.output;
        if (bot_Response){
          setChatHistory((prev) => [...prev, { text: bot_Response, isUser: false }]);
        }
      });
    }
    // Add the chatbot's response to the chat history
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  };

  useEffect(() => {
    // Run the fetchData function on page load
    fetchData();
  }, []); // 
  const handleSendQuery = async (query: string) => {
    setChatHistory((prev) => [...prev, { text: query, isUser: true }]);
    try {
      // Make the API request to fetch the chatbot's response
      const response = await fetch(`http://localhost:8000/${uuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();

      // Extract the chatbot's response from the 'text' field
      const botResponse = data.response.text || "Sorry, I didn't understand that.";
      setChatHistory((prev) => [...prev, { text: botResponse, isUser: false }]);

      // Add the chatbot's response to the chat history
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setChatHistory((prev) => [
        ...prev,
        { text: "Error: Unable to fetch a response. Please try again later.", isUser: false },
      ]);
    }
  };
  
  const handleNewChat = () => {
    router.push("/"); // Redirect to the root route
  };
  return (

    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Movie Recommender Chatbot</h1>
      <button
        onClick={handleNewChat}
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
        New Chat
      </button>
      <ChatHistory chatHistory={chatHistory} />
      <ChatInput onSendQuery={handleSendQuery} />
      
    </div>
  );
};

export default QueryPage;
