import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { performLogin } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { getRandomInt } from "../utils/common";
import { getCurrentTimestamp } from "../utils/dateUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Validação do usuário
  useEffect(() => {
    // Atualiza os dados do usuário se tudo estiver OK
    const parsedUser = JSON.parse(user);
    setUserData(parsedUser);
    if (parsedUser) {
      navigate("/games-room");
    }
  }, [user]); // Executa quando o user ou navigate mudar

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = await performLogin(email, password);
    console.log(data);
    if (data.status === "error" || data.message) {
      setError(handleLoginError(data));
    } else if (data.user && data.token) {
      // Redireciona o usuário ou atualiza o estado global
      dispatch(loginSuccess({ token: data.token, user: data.user }));

      navigate("/games-room");
    }

    setLoading(false);
  };

  const handleSubmitAsVisitor = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const tokenVisitor = "visitor";
    const userVisitor = {
      id: 0,
      name: `Visitor - ${getRandomInt(12345, 98765)}`,
      email: "visitor@visitor.com",
      created_at: getCurrentTimestamp(),
    };
    dispatch(loginSuccess({ token: tokenVisitor, user: userVisitor }));

    navigate("/games-room");

    setLoading(false);
  };

  /**
   * Trata erros retornados pela API.
   * @param {Object} error - O erro retornado pela API.
   * @returns {string} - A mensagem de erro.
   */
  const handleLoginError = (error) => {
    // Extrai a mensagem de erro da resposta da API
    if (error.errors && error.errors.email) {
      return error.errors.email[0]; // Retorna a primeira mensagem de erro do campo "email"
    }

    return "Invalid credentials.";
  };

  return (
    <>
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

          <button type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>
        <div className="complement">
          <Link to="/register">Sign up</Link>
        </div>
        <form onSubmit={handleSubmitAsVisitor}>
          <button type="submit" disabled={loading}>
            Play as visitor
          </button>
        </form>
      </div>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default Login;
