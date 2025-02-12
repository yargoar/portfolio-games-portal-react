import React, { useState, useEffect } from "react";
import { joinRoom } from "../../api/intro";
import { useNavigate } from "react-router-dom";

const GameRoom = ({
  id,
  name = "Sala sem nome",
  players = [],
  spectators = [],
  mode = "Desconhecido",
  loggedInUserId, // ID do usuário logado
  loggedInUserName, // ID do usuário logado
}) => {
  const navigate = useNavigate();
  console.log("id: " + id);
  const placePlayers = (players) => {
    if (players[0]?.position === 0) {
      setHome(players[0] || null);
      setAway(players[1] || null);
    } else {
      setHome(players[1] || null);
      setAway(players[0] || null);
    }
  };

  const [home, setHome] = useState(null); // Controle de estado de carregamento
  const [away, setAway] = useState(null); // Controle de estado de carregamento
  const [audience, setAudience] = useState(spectators); // Para mensagens de erro (se necessário)
  const [status, setStatus] = useState(mode); // Para mensagens de erro (se necessário)

  useEffect(() => {
    placePlayers(players);
    if (
      status === "JOGANDO" &&
      (loggedInUserId === home?.id || loggedInUserId === away?.id)
    ) {
      navigate("/table");
    }
  }, [players]);
  // Função interna que será chamada para entrar ou sair da sala
  const handlePlayerAction = async (
    roomId,
    userId,
    userName,
    action,
    position
  ) => {
    console.log(
      `${action} na sala: ${roomId} para o usuário ${userId} na posição ${position}`
    );
    if (action === "join") {
      try {
        console.log(roomId, userId, userName, action, position);

        const data = await joinRoom(roomId, userId, userName, position, false);
        console.log(data);
        if (data.players[0].position === 0) {
          setHome(data.players[0] || null);
          setAway(data.players[1] || null);
        } else {
          setHome(data.players[1] || null);
          setAway(data.players[0] || null);
        }

        setAudience(data.spectators);
        setStatus(data.status);
      } catch (error) {
        console.error("Erro ao entrar na sala:", error);
      }
      console.log(
        `${action} na sala: ${roomId} para o usuário ${userId} na posição ${position}`
      );
    }
  };

  return (
    <div className="game-room">
      <h2>
        {name} (ID: {false || "Sem ID"})
      </h2>
      <p>Modo: {mode}</p>

      {/* Divs para os jogadores */}
      <div className="players">
        <h3>Jogadores ({players.length}/2):</h3>

        {/* Div do jogador 1 */}
        <div className="player home">
          {home ? (
            <p>{home?.name || `Jogador ${home.id}`}</p>
          ) : (
            <button
              aria-labelledby="Clique para entrar como dono da mesa"
              className="button join"
              onClick={() =>
                handlePlayerAction(
                  id,
                  loggedInUserId,
                  loggedInUserName,
                  "join",
                  0
                )
              }
            >
              <p>Face</p>
            </button>
          )}
        </div>

        {/* Div do jogador 2 */}
        <div className="player visitor">
          {away ? (
            <p>{away?.name || `Jogador ${away.id}`}</p>
          ) : (
            <button
              aria-labelledby="Clique para entrar como dono da mesa"
              className="button join"
              onClick={() =>
                handlePlayerAction(
                  id,
                  loggedInUserId,
                  loggedInUserName,
                  "join",
                  1
                )
              }
            >
              <p>Face</p>
            </button>
          )}
        </div>
      </div>

      {/* Botão para entrar como espectador */}
      {!players.some((player) => player.id === loggedInUserId) &&
        !spectators.some((spectator) => spectator.id === loggedInUserId) && (
          <button
            aria-labelledby="Clique para entrar como dono da mesa"
            className="button join"
            onClick={() =>
              handlePlayerAction(
                id,
                loggedInUserId,
                loggedInUserName,
                "join",
                3
              )
            }
          >
            <p>Chair</p>
          </button>
        )}

      {/* Botão para o jogador logado sair */}
      {(players.some((player) => player.id === loggedInUserId) ||
        spectators.some((spectator) => spectator.id === loggedInUserId)) && (
        <button
          onClick={() => handlePlayerAction(id, loggedInUserId, "sair")}
          className="leave-button"
        >
          Sair da Sala
        </button>
      )}

      {/* Divs para os espectadores */}
      <div className="spectators">
        <h3>Espectadores ({spectators.length}):</h3>
        {spectators.length > 0 ? (
          spectators.map((spectator, index) => (
            <div key={index} className="spectator">
              <p>{spectator?.name || `Jogador ${spectator.id}`}</p>
            </div>
          ))
        ) : (
          <p>Ninguém assistindo</p>
        )}
      </div>
    </div>
  );
};

export default GameRoom;
