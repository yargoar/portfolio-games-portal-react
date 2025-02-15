// features/auth/useAuth.js
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  register,
  logout,
  updateUser,
  loginAsVisitor, // 🟢 Importando corretamente
} from "../features/auth/authSlice";
import {
  selectCurrentUser,
  selectAuthToken,
  selectIsAuthenticated,
  selectAuthStatus,
  selectAuthError,
} from "../features/auth/authSelectors";

export const useAuth = () => {
  const dispatch = useDispatch();

  return {
    // Estado
    user: useSelector(selectCurrentUser),
    token: useSelector(selectAuthToken),
    isAuthenticated: useSelector(selectIsAuthenticated),
    status: useSelector(selectAuthStatus),
    error: useSelector(selectAuthError),

    // Ações
    login: (credentials) => dispatch(login(credentials)),
    register: (userData) => dispatch(register(userData)),
    logout: () => dispatch(logout()),
    updateUser: (userData) => dispatch(updateUser(userData)),
    loginAsVisitor: (visitorData) => dispatch(loginAsVisitor(visitorData)),

    // Status Helper
    isLoading: () => useSelector(selectAuthStatus) === "loading",
  };
};
