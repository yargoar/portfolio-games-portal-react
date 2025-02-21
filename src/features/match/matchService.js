import { config } from "../../config";

const API_URL = config.API_MATCH_URL;

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro na requisição");
  }
  return data;
};

const validateMatchEvent = (matchEvent) => {
  // Validação da estrutura básica
  if (!matchEvent || typeof matchEvent !== "object") {
    throw new Error("Evento inválido: deve ser um objeto");
  }

  // Lista de tipos de eventos permitidos
  const validEventTypes = [
    "PLAYER_MOVE",
    "GAME_START",
    "GAME_OVER",
    "SPECTATOR_JOINED",
    "SPECTATOR_LEAVE",
    "PLAYER_LEAVE",
    "SEND_MESSAGE",
  ];

  // Validação do tipo do evento
  if (!validEventTypes.includes(matchEvent.type)) {
    throw new Error(`Tipo de evento inválido: ${matchEvent.type}`);
  }

  // Validação do payload
  if (!matchEvent.payload || typeof matchEvent.payload !== "object") {
    throw new Error("Payload inválido: deve ser um objeto");
  }
  console.log(matchEvent.payload);
  // Destruturação para facilitar a validação
  const { player, move, tableId, timestamp } = matchEvent.payload;
  console.log(player);
  // Validação do jogador
  if (!player || typeof player !== "object") {
    throw new Error("Player inválido: deve ser um objeto");
  }

  if (typeof player.id !== "number" || player.id <= 0) {
    throw new Error("ID do jogador inválido: deve ser um número positivo");
  }

  if (typeof player.name !== "string" || player.name.trim() === "") {
    throw new Error("Nome do jogador inválido: deve ser uma string não vazia");
  }

  // Validação do movimento
  if (!move || typeof move !== "object") {
    throw new Error("Movimento inválido: deve ser um objeto");
  }

  if (
    move.type === "MESSAGE" &&
    (typeof move.text !== "string" || typeof move.code !== "number")
  ) {
    throw new Error("move.type requires a move.text");
  }

  // Validação do tableId
  if (typeof tableId !== "number" || tableId <= 0) {
    throw new Error("ID da mesa inválido: deve ser um número positivo");
  }

  return true;
};

export const makeMove = async (event) => {
  console.log("ta tentando enviar pro servidor ");
  try {
    validateMatchEvent(event);

    const response = await fetch(`${API_URL}/make_a_move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(event),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Formato de movimento não está correto:", error);
    throw new Error(error.message || "Erro ao fazer movimento.");
  }
};
