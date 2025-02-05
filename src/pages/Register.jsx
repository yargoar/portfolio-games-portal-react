import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { performRegister } from "../api/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await performRegister(
        name,
        email,
        password,
        passwordConfirmation
      );
      if (result.user) {
        console.log("Registro bem-sucedido!");
        navigate("/");
      }
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  return (
    <>
      <div className="container register-container">
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="passwordConfirmation">Confirme a Senha:</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>

          <div className="no-login">
            <Link to="/"> Login </Link>
          </div>
        </form>
      </div>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

export default Register;
