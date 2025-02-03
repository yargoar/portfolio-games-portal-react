import React, { useState } from "react";
import GameRoom from "./components/GameRoom";
import { useAuth } from "../context/AuthContext";

const GamesRoom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="games-room-container">
      <h1>Games Room</h1>
      <GameRoom></GameRoom>
    </div>
  );
};

export default GamesRoom;
