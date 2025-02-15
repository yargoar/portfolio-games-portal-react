import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getRandomInt } from "../utils/common";
import { getCurrentTimestamp } from "../utils/dateUtils";
import { selectGlobalLoading } from "../store/_selectors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isLoading = useSelector(selectGlobalLoading);
  // Usando o hook de autenticação
  const {
    isAuthenticated,
    login,
    error: authError,
    status: authStatus,
    loginAsVisitor,
  } = useAuth();
  // Redireciona se autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/games-room");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  const handleSubmitAsVisitor = async (e) => {
    e.preventDefault();
    const visitorNumber = getRandomInt(12345, 98765);

    loginAsVisitor({
      id: visitorNumber,
      name: `Visitor - ${visitorNumber}`,
      email: `visitor-${visitorNumber}@visitor.com`,
      created_at: getCurrentTimestamp(),
    });
  };

  return (
    <div className="container login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmitLogin}>
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

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Entrar"}
        </button>
      </form>

      <div className="complement">
        <Link to="/register">Criar conta</Link>
      </div>

      <form onSubmit={handleSubmitAsVisitor}>
        <button type="submit" disabled={isLoading}>
          Jogar como visitante
        </button>
      </form>

      {authStatus === "failed" && (
        <p className="error-message">
          {authError?.message || "Credenciais inválidas"}
        </p>
      )}
    </div>
  );
};

export default Login;
