import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispara a action de logout
    navigate("/"); // Redireciona para a tela de login
  };

  return <button onClick={handleLogout}>Sair</button>;
};

export default LogoutButton;
