import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import introReducer from "../features/intro/introSlice";
//import gamesRoomReducer from "../features/games-room/gamesRoomSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    intro: introReducer,
    //gamesRoom: gamesRoomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { store, persistor };
