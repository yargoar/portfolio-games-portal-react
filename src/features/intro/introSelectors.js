// features/intro/introSelectors.js
export const selectRooms = (state) => state.intro.rooms || [];
export const selectIntroLoading = (state) => state.intro.loading || false;
export const selectIntroError = (state) => state.intro.error || null;

// Novo seletor para o loading de joinRoom por sala e posição
export const selectJoinLoadingByRoomIdAndPosition = (state, roomId, position) =>
  state.intro.joinLoading[roomId]?.[position] || false;
