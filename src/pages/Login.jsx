import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { performLogin } from "../api/auth"; // Importando a função performLogin
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = await performLogin(email, password);
    dispatch(loginSuccess({ token: data.token, user: data.user }));

    if (data.status === "success") {
      // Redireciona o usuário ou atualiza o estado global
      console.log("Login bem-sucedido:", data.user);
      navigate("/games-room");
    } else {
      setError(data.message);
    }

    setLoading(false);
  };

  if (user) {
    return (
      <div className="login-container">
        <h1>Bem-vindo de volta, {user.name}!</h1>
        <p>
          Você já está logado.{" "}
          <button onClick={() => navigate("/games-room")}>
            Ir para a sala de jogos
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Usuário:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
