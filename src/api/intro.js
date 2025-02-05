import { config } from "../config";

const API_URL = config.API_URL;

export const getRooms = async () => {
  const GAMEROOMS_API_URL = `${API_URL}/api/rooms`;
  console.log(GAMEROOMS_API_URL);
  try {
    const response = await fetch(GAMEROOMS_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.json();
  } catch (error) {
    // Trata erros de conexão (API offline, CORS, etc.)
    if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("Network Error")
    ) {
      return {
        status: "error",
        message:
          "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.",
      };
    }
  }
};
