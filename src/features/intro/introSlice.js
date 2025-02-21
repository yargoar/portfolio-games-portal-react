// features/intro/introSlice.js
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getRooms, joinRoom } from "./introService";
import { isInAnActiveRoom } from "./introSelectors";

// Thunk para buscar salas
export const fetchRooms = createAsyncThunk(
  "intro/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const rooms = await getRooms();
      return rooms;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk para entrar em uma sala
export const attemptJoinRoom = createAsyncThunk(
  "intro/joinRoom",
  async (
    { roomId, user, userName, position, isSpectator },
    { rejectWithValue }
  ) => {
    try {
      const result = await joinRoom(
        roomId,
        user,
        userName,
        position,
        isSpectator
      );
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkActiveRoom = (state) => {
  return isInAnActiveRoom(state);
};

const initialState = {
  rooms: [],
  loading: false, // Loading geral (fetchRooms)
  joinLoading: {}, // Loading específico por sala e posição
  error: null,
};

// Slice principal
const introSlice = createSlice({
  name: "intro",
  initialState,
  reducers: {
    updateRoom(state, action) {
      const updatedRoom = action.payload;

      // 1. Atualiza a sala modificada
      const index = state.rooms.findIndex((room) => room.id === updatedRoom.id);
      if (index !== -1) {
        state.rooms[index] = updatedRoom;
      }

      // 2. Coleta todos os IDs de usuário da sala atualizada
      const userIds = [
        ...updatedRoom.players.map((p) => p.id),
        ...updatedRoom.spectators.map((s) => s.id),
      ];

      // 3. Remove os usuários de todas as outras salas
      state.rooms = state.rooms.map((room) => {
        if (room.id === updatedRoom.id) return room;

        return {
          ...room,
          players: room.players.filter((p) => !userIds.includes(p.id)),
          spectators: room.spectators.filter((s) => !userIds.includes(s.id)),
        };
      });
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Rooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Join Room
      .addCase(attemptJoinRoom.pending, (state, action) => {
        const { roomId, position } = action.meta.arg;
        state.joinLoading[roomId] = {
          ...state.joinLoading[roomId],
          [position]: true,
        };
      })
      .addCase(attemptJoinRoom.fulfilled, (state, action) => {
        const { roomId, position, user: userId } = action.meta.arg;
        const updatedRoom = action.payload;

        if (state.joinLoading[roomId]) {
          state.joinLoading[roomId][position] = false;
        }

        const roomIndex = state.rooms.findIndex(
          (room) => room.id === updatedRoom.id
        );
        if (roomIndex !== -1) {
          state.rooms[roomIndex] = updatedRoom;
        }
      })

      .addCase(attemptJoinRoom.rejected, (state, action) => {
        const { roomId, position } = action.meta.arg;
        if (state.joinLoading[roomId]) {
          state.joinLoading[roomId][position] = false;
        }
        state.error = action.payload;
      });
  },
});

// Exportações
export const { updateRoom, clearError } = introSlice.actions;
export default introSlice.reducer;
