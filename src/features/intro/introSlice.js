// features/intro/introSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRooms, joinRoom } from "./introService";

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
      const index = state.rooms.findIndex((room) => room.id === updatedRoom.id);
      if (index !== -1) {
        state.rooms[index] = updatedRoom;
      }
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
        const { roomId, position, user } = action.meta.arg;

        // 1️⃣ Desativa o loading da posição específica
        if (state.joinLoading[roomId]) {
          state.joinLoading[roomId][position] = false;
        }

        const updatedRoom = action.payload;

        // 2️⃣ Atualiza a sala recebida
        const roomIndex = state.rooms.findIndex(
          (room) => room.id === updatedRoom.id
        );
        if (roomIndex !== -1) {
          state.rooms[roomIndex] = updatedRoom;
        }

        // 3️⃣ Remove o usuário de outras salas (exceto a atual)
        state.rooms = state.rooms.map((room) => {
          if (room.id !== updatedRoom.id) {
            return {
              ...room,
              players: room.players.filter((player) => player.id !== user),
              spectators: room.spectators.filter(
                (spectator) => spectator.id !== user
              ),
            };
          }
          return room;
        });
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
