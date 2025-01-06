import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const HomePage:React.FC = () => {
  
  const router = useRouter();

  const handleRedirect = () => {
    // Generate a unique UID
    const uid = uuidv4();
    // Redirect to the dynamic route
    router.push(`/${uid}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to Movie Recommender Chatbot
        </h1>
       <button
        onClick={handleRedirect}
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
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;