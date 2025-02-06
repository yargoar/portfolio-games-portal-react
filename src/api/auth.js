import { config } from "../config";

const API_URL = config.API_URL;

/**
 * Realiza o processo de login.
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise<Object>} - Um objeto com o status e os dados ou a mensagem de erro.
 */
export const performLogin = async (email, password) => {
  const LOGIN_API_URL = `${API_URL}/login`;

  try {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  } catch (error) {
    // Trata erros de conexão (API offline, CORS, etc.)
    if (
      error.message.includes("Failed to fetch") ||
      error.message.includes("Network Error")
    ) {
      return {
        status: "error",
        message:
          "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.",
      };
    }

    // Trata outros erros (ex: credenciais inválidas)
    return {
      status: "error",
      message: error.message || "Ocorreu um erro durante o login.",
    };
  }
};

// src/api/auth.js

/**
 * Realiza o processo de registro.
 * @param {string} name - O nome do usuário.
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise<Object>} - Um objeto com o status e os dados ou a mensagem de erro.
 */
export const performRegister = async (
  name,
  email,
  password,
  password_confirmation
) => {
  try {
    // Faz a requisição à API
    const response = await registerUser(
      name,
      email,
      password,
      password_confirmation
    );

    // Trata a resposta de sucesso
    const { token, user } = handleRegisterSuccess(response);

    return { status: "success", token, user };
  } catch (error) {
    // Trata o erro
    const errorMessage = handleRegisterError(error);
    return { status: "error", message: errorMessage };
  }
};

// src/api/auth.js

/**
 * Trata erros retornados pela API de registro.
 * @param {Object} error - O erro retornado pela API.
 * @returns {string} - A mensagem de erro.
 */
export const handleRegisterError = (error) => {
  if (error.message === "Erro ao registrar usuário") {
    return "Erro ao conectar com o servidor. Tente novamente mais tarde.";
  }

  // Extrai a mensagem de erro da resposta da API
  if (error.errors) {
    if (error.errors.email) {
      return error.errors.email[0]; // Retorna a primeira mensagem de erro do campo "email"
    }
    if (error.errors.password) {
      return error.errors.password[0]; // Retorna a primeira mensagem de erro do campo "password"
    }
    if (error.errors.name) {
      return error.errors.name[0]; // Retorna a primeira mensagem de erro do campo "name"
    }
  }

  return "Erro ao registrar. Verifique os dados e tente novamente.";
};
// src/api/auth.js

/**
 * Trata a resposta de sucesso da API de registro.
 * @param {Object} data - Os dados retornados pela API.
 * @returns {Object} - Os dados do usuário e o token.
 */
export const handleRegisterSuccess = (data) => {
  const { token, user } = data;

  // Salva o token no localStorage (ou em um estado global, como Redux ou Context API)
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(user));

  return { token, user };
};
/**
 * Faz a requisição de registro à API.
 * @param {string} name - O nome do usuário.
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise<Response>} - A resposta da API.
 */
export const registerUser = async (
  name,
  email,
  password,
  password_confirmation
) => {
  const REGISTER_API_URL = `${API_URL}/register`; // URL correta
  try {
    const response = await fetch(REGISTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation,
      }), // Adicionado password_confirmation
    });

    if (!response.ok) {
      throw new Error("Erro ao registrar usuário");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
