import { config } from "../../config";

const API_URL = config.API_URL;

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro na requisição");
  }
  return data;
};

export const getRooms = async () => {
  try {
    const response = await fetch(`${API_URL}/rooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Erro ao buscar salas:", error);
    throw new Error(error.message || "Erro ao buscar salas.");
  }
};

export const joinRoom = async (
  roomId,
  user,
  userName = "",
  position = 0,
  isSpectator = false
) => {
  try {
    const response = await fetch(`${API_URL}/rooms/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ roomId, user, userName, position, isSpectator }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Erro ao entrar na sala:", error);
    throw new Error(error.message || "Erro ao entrar na sala.");
  }
};
