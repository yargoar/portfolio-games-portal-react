// features/intro/introSelectors.js
export const selectRooms = (state) => state.intro.rooms || [];
export const selectIntroLoading = (state) => state.intro.loading || false;
export const selectIntroError = (state) => state.intro.error || null;

// Novo seletor para o loading de joinRoom por sala e posição
export const selectJoinLoadingByRoomIdAndPosition = (state, roomId, position) =>
  state.intro.joinLoading[roomId]?.[position] || false;

export const isInAnActiveRoom = (state) => {
  const user = state.auth.user;
  const rooms = state.intro.rooms;

  if (!user || !rooms.length) return false;

  return rooms.find(
    (room) =>
      room.status === "JOGANDO" &&
      [...room.players, ...room.spectators].some(
        (participant) => participant.id === user.id
      )
  );
};
