// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client"; // Importe createRoot
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";

// Seleciona o elemento raiz do seu aplicativo
const container = document.getElementById("root");

// Cria uma raiz com createRoot
const root = createRoot(container);

// Renderiza o aplicativo dentro da raiz
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
