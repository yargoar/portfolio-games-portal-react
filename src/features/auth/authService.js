// features/auth/authService.js
import { config } from "../../config";

const API_URL = config.API_URL;

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data?.message || "Erro na requisição");
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  } catch (error) {
    error.message =
      error.message || "Falha na conexão. Verifique sua internet.";
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.passwordConfirmation,
      }),
    });
    return handleResponse(response);
  } catch (error) {
    error.message = error.message || "Falha no registro. Tente novamente.";
    throw error;
  }
};
