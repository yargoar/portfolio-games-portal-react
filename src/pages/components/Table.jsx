import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useIntro } from "../../hooks/useIntro";
import { useAuth } from "../../hooks/useAuth";

const Table = ({ p_room }) => {
  const { joinGameRoom, getJoinLoading } = useIntro();
  const { user } = useAuth();

  // Estado local para players e spectators
  const { id, name, status, players = [], spectators = [] } = p_room || {};

  // Mantenha apenas os loadings específicos
  const homeLoading = getJoinLoading(id, 0);
  const awayLoading = getJoinLoading(id, 1);
  const spectatorLoading = getJoinLoading(id, 3);

  if (!p_room) {
    return <div>Carregando mesa...</div>;
  }

  const loggedInUserId = user?.id;

  // Jogadores organizados
  // Dentro do componente Table
  const home = players.find((p) => p.position === 0) || null;
  const away = players.find((p) => p.position === 1) || null;

  // Função para entrar na sala
  const handleJoinRoom = async (position) => {
    if (!user) {
      alert("Você precisa estar logado para entrar em uma sala!");
      return;
    }

    const success = await joinGameRoom(id, user.id, user.name, position, false);

    if (success) {
      console.log("Entrou na sala com sucesso!");
    } else {
      console.log("Falha ao entrar na sala.");
    }
  };

  return (
    <div className="game-room">
      <h2>
        {name} (ID: {id})
      </h2>
      <p>Modo: {status}</p>

      {/* Jogadores */}
      <div className="players">
        <h3>Jogadores ({players.length}/2):</h3>

        <div className="player home">
          {home ? (
            <p>{home?.name || `Jogador ${home.id}`}</p>
          ) : (
            <button onClick={() => handleJoinRoom(0)} disabled={homeLoading}>
              {homeLoading ? "Entrando..." : "Entrar como Jogador 1"}
            </button>
          )}
        </div>

        <div className="player visitor">
          {away ? (
            <p>{away?.name || `Jogador ${away.id}`}</p>
          ) : (
            <button onClick={() => handleJoinRoom(1)} disabled={awayLoading}>
              {awayLoading ? "Entrando..." : "Entrar como Jogador 2"}
            </button>
          )}
        </div>
      </div>

      {/* Espectadores */}
      <div className="spectators">
        <h3>Espectadores ({spectators.length}):</h3>
        {spectators.length > 0 ? (
          spectators.map((spectator, index) => (
            <p key={index}>{spectator.name}</p>
          ))
        ) : (
          <p>Ninguém assistindo</p>
        )}
      </div>

      {/* Entrar como espectador */}
      {!players.some((p) => p.id === loggedInUserId) &&
        !spectators.some((s) => s.id === loggedInUserId) && (
          <button onClick={() => handleJoinRoom(3)} disabled={spectatorLoading}>
            {spectatorLoading ? "Entrando..." : "Entrar como Espectador"}
          </button>
        )}
    </div>
  );
};

export default Table; // Usa React.memo para evitar rerenders desnecessários
