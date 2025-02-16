import React, { useState, useEffect } from "react";
import { useIntro } from "../../hooks/useIntro";
import { useAuth } from "../../hooks/useAuth";

const Table = ({ p_room }) => {
  const { joinGameRoom, getJoinLoading } = useIntro();
  const { user } = useAuth();

  // Estado local para players e spectators
  const { id, name, status, players = [], spectators = [] } = p_room || {};

  // Mantenha apenas os loadings específicos
  const homeLoading = getJoinLoading(id, 1);
  const awayLoading = getJoinLoading(id, 2);
  const spectatorLoading = getJoinLoading(id, 0);

  if (!p_room) {
    return <div>Carregando mesa...</div>;
  }

  const loggedInUserId = user?.id;

  // Jogadores organizados
  // Dentro do componente Table
  const home = players.find((p) => p.position === 1) || null;
  const away = players.find((p) => p.position === 2) || null;

  // Função para entrar na sala
  const handleJoinRoom = async (position) => {
    if (!user) {
      alert("Você precisa estar logado para entrar em uma sala!");
      return;
    }

    let isSpectator = false;

    if (position == 0) {
      isSpectator = true;
    }

    const success = await joinGameRoom(
      id,
      user.id,
      user.name,
      position,
      isSpectator
    );

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
            <button onClick={() => handleJoinRoom(1)} disabled={homeLoading}>
              {homeLoading ? "Entrando..." : "Entrar como Jogador 1"}
            </button>
          )}
        </div>

        <div className="player visitor">
          {away ? (
            <p>{away?.name || `Jogador ${away.id}`}</p>
          ) : (
            <button onClick={() => handleJoinRoom(2)} disabled={awayLoading}>
              {awayLoading ? "Entrando..." : "Entrar como Jogador 2"}
            </button>
          )}
        </div>
      </div>

      {/* Espectadores */}

      {/* Entrar como espectador */}

      <div className="spectators">
        <h5>Espectadores</h5>
        {spectators.map((spectator) => (
          <p key={spectator.id}>
            {spectator.name || `Espectador ${spectator.id}`}
          </p>
        ))}
      </div>
      {!spectators.some((s) => s.id === loggedInUserId) && (
        <button onClick={() => handleJoinRoom(0)} disabled={spectatorLoading}>
          {spectatorLoading ? "Entrando..." : "Entrar como Espectador"}
        </button>
      )}
    </div>
  );
};

export default Table; // Usa React.memo para evitar rerenders desnecessários
