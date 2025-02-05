import React, { useState, useEffect } from "react"; // Adicione o useEffect
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice"; // Importando a ação de logout
import LogoutButton from "./components/LogoutButton"; // Componente do botão de logout
import GameRoom from "./components/GameRoom";
import { getRooms } from "../api/intro";

const GamesRoom = () => {
  const [loading, setLoading] = useState(false); // Controle de estado de carregamento
  const [error, setError] = useState(""); // Para mensagens de erro (se necessário)

  //User validations
  const dispatch = useDispatch(); // Precisamos usar o dispatch para despachar a ação de logout
  const { user } = useSelector((state) => state.auth); // Pegando os dados persistidos na store
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "" });

  // Validação do usuário
  useEffect(() => {
    useEffectUser(user);
  }, [user]); // Executa quando o user ou navigate mudar

  //Games room config
  // Array de salas de exemplo (substitua por dados reais da sua API)
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await getRooms();
        console.log("Salas recebidas:", data);
        setRooms(data); // <- Agora data sempre será um array válido
      } catch (err) {
        console.error("Erro no fetchRooms:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const useEffectUser = (user) => {
    // Atualiza os dados do usuário se tudo estiver OK
    const parsedUser = JSON.parse(user);
    setUserData(parsedUser);
    if (!parsedUser) {
      navigate("/");
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true); // Ativando o carregamento

    try {
      // Despachando a ação de logout
      dispatch(logout()); // O Redux vai limpar o estado e remover o localStorage
    } catch (error) {
      setError("Erro ao fazer logout."); // Se algo der errado, mostramos um erro
    } finally {
      setLoading(false); // Desativa o carregamento
    }
  };

  if (loading) return <div>Carregando salas...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <>
      <div className="top-bar">
        {/* O botão de logout, que ao ser clicado, chama o handleLogout */}
        <LogoutButton handleLogout={handleLogout} />
      </div>

      <div className="games-room-container">
        <h1>Salas Disponíveis ({rooms.length})</h1>

        <div className="rooms">
          <div className="rooms-grid">
            {rooms.map((room) => (
              <GameRoom
                key={room.id} // Sempre use uma key única em loops
                name={room.name}
                players={room.players}
                mode={room.mode}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamesRoom;
