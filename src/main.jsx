// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client"; // Importe createRoot
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Importando o PersistGate
import { store, persistor } from "./store/store"; // Importando a store e o persistor
import "./index.css";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GamesRoom from "./pages/GamesRoom";

// Seleciona o elemento raiz do seu aplicativo
const container = document.getElementById("root");

// Cria uma raiz com createRoot
const root = createRoot(container);

// Renderiza o aplicativo dentro da raiz
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {" "}
      {/* Pode colocar um loading aqui */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<App />} />
          <Route path="/games-room" element={<GamesRoom />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
  //</React.StrictMode>
);
