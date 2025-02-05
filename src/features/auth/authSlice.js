import { createSlice } from "@reduxjs/toolkit";

// Função para carregar o estado inicial do localStorage
const loadInitialState = () => {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("user");

  return {
    token: token || null,
    user: user || null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(), // Carrega o estado inicial
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = JSON.stringify(user);
      localStorage.setItem("authToken", state.token); // Salva o token no localStorage
      localStorage.setItem("user", state.user); // Salva os dados do usuário no localStorage
    },
    logout: (state) => {
      console.log("logout", state);
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken"); // Remove o token do localStorage
      localStorage.removeItem("user"); // Remove os dados do usuário do localStorage
    },
  },
});

// Exporta as actions
export const { loginSuccess, logout } = authSlice.actions;

// Exporta o reducer
export default authSlice.reducer;
