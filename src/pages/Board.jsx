import React, { useState, useEffect } from "react";
import TicTacToe from "./games/TicTacToe/TicTacToe";
import { useMatch } from "../hooks/useMatch"; // Usando importação nomeada
import useMatchSocket from "../hooks/sockets/useMatchSocket";

const Board = ({ room, loggedUser: user }) => {
  const [gameState, setGameState] = useState(room.gameState);
  const [newMove, setNewMove] = useState(null);
  const [players, setPlayers] = useState(room.players);
  const [spectators, setSpectators] = useState(room.spectators);
  const { sendMove } = useMatch();

  // Configuração dos listeners do socket
  // useEffect(() => {
  //   const handlers = {
  //     game_move: (newState) => setGameState(newState),
  //     game_end: (result) => handleGameEnd(result),
  //     game_start: (newGameState) => handleNewGame(newGameState),
  //     player_joined: (updatedPlayers) => setPlayers(updatedPlayers),
  //     player_left: (updatedPlayers) => setPlayers(updatedPlayers),
  //     spectator_joined: (updatedSpectators) => setSpectators(updatedSpectators),
  //     spectator_left: (updatedSpectators) => setSpectators(updatedSpectators),
  //   };

  //   Object.entries(handlers).forEach(([event, handler]) => {
  //     socket.on(event, handler);
  //   });

  //   return () => {
  //     Object.entries(handlers).forEach(([event, handler]) => {
  //       socket.off(event, handler);
  //     });
  //   };
  // }, [socket]);

  const handleMatchEventFromMatch = (matchEvent) => {
    try {
      console.log(`Board escutou o evento DA PARTIDA`);
      console.log(matchEvent);
      sendMove(matchEvent);
    } catch (error) {
      console.error("Erro na validação do evento:", error.message);
    }
  };

  const handleMatchEventFromServer = (matchEvent) => {
    console.log(`Board escutou o evento DO SERVIDOR`);
    console.log(matchEvent);
    if (matchEvent.type === "PLAYER_MOVE") {
      setNewMove(matchEvent);
    }
  };

  useMatchSocket(room.id, handleMatchEventFromServer);

  const matchProps = {
    tableId: room?.id,
    board: gameState?.board || [],
    players: room?.players,
    spectators: room?.spectators,
    loggedUser: user,
    winner: gameState?.winner,
    onMove: handleMatchEventFromMatch,
    newMove: newMove,
  };

  return (
    <div className="board-container">
      <div className="game-header">
        <h2>Sala: {room.name}</h2>
        <div className="game-status">
          {gameState?.status === "finished" && (
            <button onClick={handleMatchEvent}>Revanche</button>
          )}
        </div>
      </div>

      <div className="game-wrapper">
        <TicTacToe {...matchProps} />
      </div>

      {/* <div className="game-info-panel">
        <div className="players-list">
          <h3>Jogadores</h3>
          {players.map((player) => (
            <div
              key={player.id}
              className={`player ${
                player.id === user.id ? "current-user" : ""
              }`}
            >
              {player.name} {player.id === gameState?.currentPlayer && "🎮"}
            </div>
          ))}
        </div>

        <div className="spectators-list">
          <h3>Espectadores ({spectators.length})</h3>
          {spectators.map((spectator) => (
            <div
              key={spectator.id}
              className={`spectator ${
                spectator.id === user.id ? "current-user" : ""
              }`}
            >
              {spectator.name}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Board;
