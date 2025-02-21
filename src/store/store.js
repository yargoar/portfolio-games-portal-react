// src/store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import introReducer from "../features/intro/introSlice";
import navigationReducer from "../features/navigation/navigationSlice";
import matchReducer from "../features/match/matchSlice";

// Configuração do persist para auth e navigation
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "navigation"], // Apenas auth e navigation é persistido, adicionar qualquer outro reducer a ser persistido aqui
};

// Combinando reducers
const rootReducer = combineReducers({
  auth: authReducer,
  intro: introReducer,
  navigation: navigationReducer,
  match: matchReducer,
});

// Aplicando persistência ao rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuração da store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configuração do persistor
const persistor = persistStore(store);

export { store, persistor };
