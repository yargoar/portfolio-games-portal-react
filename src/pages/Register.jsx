import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  // Hook de autenticação
  const { register, status, error } = useAuth();
  const isLoading = status === "loading";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ name, email, password, passwordConfirmation });
    navigate("/");
  };

  return (
    <div className="container register-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="passwordConfirmation">Confirme a Senha:</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrar"}
        </button>
      </form>

      <div className="no-login">
        <Link to="/">Login</Link>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;
