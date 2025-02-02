import React, { useState } from "react";
import { performLogin } from "../api/auth"; // Importando a função performLogin
import Room from "./components/Room";

const GamesRoom = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const LOGIN_API_URL = `${VITE_API_URL}/api/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("login");
    const result = await performLogin(LOGIN_API_URL, email, password);

    if (result.status === "success") {
      // Redireciona o usuário ou atualiza o estado global
      console.log("Login bem-sucedido:", result.user);
      window.location.href = "/app"; // Redireciona para a página principal
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="games-room-container">
      <h1>Games Room</h1>
      <div className="rooms">
        <div className="user home"></div>
        <div className="user away"></div>
        <div className="score"></div>
        <div className="game"></div>
        <div className="audience"></div>
      </div>
    </div>
  );
};

export default GamesRoom;
