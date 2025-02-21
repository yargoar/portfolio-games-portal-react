import React, { useEffect, useState } from "react";
import { useIntro } from "../hooks/useIntro";
import { useAuth } from "../hooks/useAuth";
import useIntroSocket from "../hooks/sockets/useIntroSocket";
import Table from "./components/Table/Table";
import Board from "./Board";

const GamesRoom = () => {
  const { rooms, loading, error, loadRooms, updateRoom, inActiveRoom } =
    useIntro();
  const { user } = useAuth();

  // Função para lidar com o evento RoomUpdated
  const handleRoomUpdated = (updatedRoom) => {
    console.log(`Games room escutou o evento e chamou no updateRoom`);
    updateRoom(updatedRoom);

    const userIds = [
      ...updatedRoom.players.map((p) => p.id),
      ...updatedRoom.spectators.map((s) => s.id),
    ];
  };

  // Usa o hook para ouvir o evento
  useIntroSocket(handleRoomUpdated);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  if (loading) {
    return <div>Carregando salas...</div>;
  }

  if (error) {
    return <div className="error">Erro: {error}</div>;
  }

  console.log(inActiveRoom);
  if (inActiveRoom) {
    return <Board room={inActiveRoom} loggedUser={user} />;
  }
  return (
    <div className="games-room-container">
      <h1>Salas Disponíveis ({rooms.length})</h1>
      <div className="rooms-grid">
        {rooms?.map((room) => (
          <Table key={room.id} p_room={room} />
        ))}
      </div>
    </div>
  );
};

export default GamesRoom;
