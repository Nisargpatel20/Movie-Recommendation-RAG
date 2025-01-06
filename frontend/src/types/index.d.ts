// // Declare a namespace for your types
// declare namespace App {
//     // Type definition for a movie recommendation
//     interface Recommendation {
//       title: string;
//       description: string;
//       poster_url?: string; // Optional property for the poster image URL
//     }
  
//     // Type definition for a chat message in the history
//     interface ChatMessage {
//       role: "user" | "bot"; // Role can be "user" or "bot"
//       content: string; // The text content of the message
//       timestamp?: string; // Optional timestamp for the message
//     }
  
//     // Type definition for API response
//     interface ApiResponse {
//       recommendations: Recommendation[]; // List of recommended movies
//       message?: string; // Optional message from the backend
//     }
//   }
  
//   // Export the namespace to make it accessible globally
//   export = App;
//   export as namespace App;
  

// Declare the structure of the chat messages
interface ChatMessage {
    text: string; // The text of the message
    isUser: boolean; // Whether the message is from the user or the chatbot
  }
  
  // Declare the structure of the API response
  interface ApiResponse {
    text: string; // The chatbot's response text
    context?: string; // Optional context if provided by the API
    query?: string; // The original query sent to the API
  }
  
  // Add custom module declarations (if any modules are not recognized by TypeScript)
  declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  // Declare the global Node.js environment variable types (optional)
  declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string; // Example for the public API URL in Next.js
      NODE_ENV: "development" | "production" | "test";
    }
  }
  