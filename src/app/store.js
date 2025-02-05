import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist"; // Importando o persist
import storage from "redux-persist/lib/storage"; // Usando o localStorage como persistência
import authReducer from "../features/auth/authSlice"; // Reducer de autenticação
import { createTransform } from "redux-persist";

const userTransform = createTransform(
  (inboundState) => ({
    ...inboundState,
    user: JSON.stringify(inboundState.user), // Transformação antes de persistir
  }),
  (outboundState) => ({
    ...outboundState,
    user: JSON.parse(outboundState.user), // Transformação ao recuperar do estado
  }),
  { whitelist: ["auth"] }
);
// Configuração do Redux Persist
const persistConfig = {
  key: "root",
  storage, // Usando o localStorage (ou sessionStorage) para persistir o estado
  whitelist: ["auth"], // Garantindo que apenas o estado de autenticação será persistido
  serialize: true, // Garante que tudo é serializável
  // transforms: [userTransform],
};

// Reducer persistido
const persistedReducer = persistReducer(persistConfig, authReducer);

// Criando a store do Redux com o persistReducer
const store = configureStore({
  reducer: {
    auth: persistedReducer, // Aplicando o persistedReducer ao estado de autenticação
  },
});

const persistor = persistStore(store); // Criando o persistor

export { store, persistor }; // Exportando tanto a store quanto o persistor
