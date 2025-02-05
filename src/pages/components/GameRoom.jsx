import React, { useState } from "react";

const GameRoom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="game-room">
      <div className="user home">
        <p></p>
        <p></p>
      </div>
      <div className="user away"></div>
      <div className="score"></div>
      <div className="game"></div>
      <div className="audience"></div>
    </div>
  );
};

export default GameRoom;
