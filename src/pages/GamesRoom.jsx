import React, { useEffect } from "react";

import { useIntro } from "../hooks/useIntro";
import useRoomSocket from "../hooks/sockets/useRoomsSocket";
import Table from "./components/Table";

const GamesRoom = () => {
  const { rooms, loading, error, loadRooms, updateRoom } = useIntro();

  // Função para lidar com o evento RoomUpdated
  const handleRoomUpdated = (data) => {
    console.log(`Games room escutou o evento e chamou no updateRoom`);
    console.log(data);
    updateRoom(data);
  };

  // Usa o hook para ouvir o evento
  useRoomSocket(handleRoomUpdated);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  if (loading) {
    return <div>Carregando salas...</div>;
  }

  if (error) {
    return <div className="error">Erro: {error}</div>;
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
