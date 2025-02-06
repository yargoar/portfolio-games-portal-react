// src/config.js
export const config = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:8000/api", // Fallback caso a variável não esteja definida
};
