import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import { GAME_DIFFICULTY, GAME_STATUS } from "../../constants";
import Board from "../../components/Board";

const GamePage = ({ difficulty = GAME_DIFFICULTY.EASY }) => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);

  const handleGameOver = (minesLeft) => {
    console.log(`Game Over! Mines left: ${minesLeft}`);

    if (minesLeft === 0) {
      setGameStatus(GAME_STATUS.WON);
    } else {
      setGameStatus(GAME_STATUS.LOST);
    }
  };

  return (
    <PageContainer>
      <div className="game-page">
        <h1>Minesuiper</h1>
        <p>Por Facundo Tourn</p>
        <Board
          difficulty={difficulty}
          gameStatus={gameStatus}
          onGameOver={handleGameOver}
        />
        {gameStatus === GAME_STATUS.WON && (
          <div className="game-status">
            <h2>Congratulations! You won!</h2>
          </div>
        )}
        {gameStatus === GAME_STATUS.LOST && (
          <div className="game-status">
            <h2>Game Over! You lost!</h2>
          </div>
        )}
        <style jsx>{`
          .game-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background-color: #f0f0f0;
            width: 100%;
          }
          h1 {
            color: #333;
          }
          p {
            color: #666;
          }
        `}</style>
      </div>
    </PageContainer>
  );
};

export default GamePage;
