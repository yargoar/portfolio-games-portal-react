import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./TicTacToe.css";

const TicTacToe = ({
  tableId,
  players,
  spectators,
  loggedUser,
  gameState,
  onMove,
  newMove,
}) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState(() => {
    return players?.find((p) => p.position === 1) || players?.[0] || null;
  });
  const [winner, setWinner] = useState(null);
  const symbols = { 1: "X", 2: "O" };

  useEffect(() => {
    if (gameState) {
      setBoard(gameState.board);
      setNextPlayer(gameState.nextPlayer);
      setWinner(gameState.winner);
    }
  }, [gameState]);
  const changeTurn = () => {
    const nextPlayerToMove = players.find((p) => p.id !== nextPlayer.id);
    setNextPlayer(nextPlayerToMove);
  };
  const checkVictory = () => {
    const winningCombinations = [
      [0, 1, 2], // Linha superior
      [3, 4, 5], // Linha do meio
      [6, 7, 8], // Linha inferior
      [0, 3, 6], // Coluna esquerda
      [1, 4, 7], // Coluna do meio
      [2, 5, 8], // Coluna direita
      [0, 4, 8], // Diagonal principal
      [2, 4, 6], // Diagonal secundária
    ];

    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const winnerSymbol = board[a];
        const winnerPlayer = players.find((p) => p.symbol === winnerSymbol);

        if (winnerPlayer) {
          setWinner(winner);
          console.log(`Temos um vencedor: ${winner.name} (${winner.symbol})`);

          return {
            id: winnerPlayer.id,
            name: winnerPlayer.name,
            symbol: winnerSymbol,
          };
        }
      }
    }
  };
  useEffect(() => {
    console.log("Trata a jogada");

    if (!newMove) return;
    const newBoard = [...board];

    newBoard[newMove.payload.move.position] = newMove.payload.move.symbol;
    setBoard(newBoard);
    const winner = checkVictory(newBoard, players);

    if (newMove.payload.player.id === loggedUser.id) return;
    changeTurn();
  }, [newMove]);

  const handleClick = (index) => {
    console.log("click");
    if (!board[index] && loggedUser.id === nextPlayer?.id) {
      const newBoard = [...board];
      const newSymbol = symbols[nextPlayer.position];

      // Atualização otimista
      newBoard[index] = newSymbol;
      setBoard(newBoard);

      // Encontra próximo jogador
      changeTurn();

      onMove({
        type: "PLAYER_MOVE",
        payload: {
          tableId,
          move: { type: "MATCH_EVENT", position: index, symbol: newSymbol },
          player: {
            id: loggedUser.id,
            name: loggedUser.name,
          },
        },
      });
    }
  };

  const renderCell = (index) => (
    <button
      className={`cell ${board[index] ? "occupied" : ""}`}
      onClick={() => handleClick(index)}
      disabled={!!winner || board[index] || loggedUser.id !== nextPlayer?.id}
      data-testid={`cell-${index}`}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="tic-tac-toe-container">
      <div className="players-info">
        {players.map((player) => (
          <div
            key={player.id}
            className={`player ${nextPlayer?.id === player.id ? "active" : ""}`}
          >
            {player.name} ({symbols[player.position]})
          </div>
        ))}
      </div>

      <div className="game-board">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="cell-container">
            {renderCell(index)}
          </div>
        ))}
      </div>

      {/* ... restante do código ... */}
    </div>
  );
};

TicTacToe.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      position: PropTypes.oneOf([1, 2]).isRequired,
    })
  ).isRequired,
  // ... outras propTypes
};

export default TicTacToe;
