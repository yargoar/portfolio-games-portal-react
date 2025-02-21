// src/config.js
export const config = {
  API_AUTH_URL:
    import.meta.env.VITE_API_AUTH_URL || "http://localhost:8000/api", // Fallback caso a variável não esteja definida
  API_INTRO_URL:
    import.meta.env.VITE_API_INTRO_URL || "http://localhost:8000/api", // Fallback caso a variável não esteja definida
  API_MATCH_URL:
    import.meta.env.VITE_API_MATCH_URL || "http://localhost:8000/api", // Fallback caso a variável não esteja definida
};
