import React from "react";
import { useAuth } from "../context/AuthContext";
import Auth from "../components/Auth";

function Home() {
  const { signUp } = useAuth();
  const data = "Good";
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgb(200, 200, 200) 2px, transparent 2px)",
        backgroundSize: "40px 40px",
      }}
    >
      <Auth />
    </div>
  );
}

export default Home;
