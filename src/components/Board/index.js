import React, { useEffect } from "react";
import BoardCell from "../BoardCell";
import { BOARD_SIZE } from "../../constants";
import { initializeBoard, placeMines } from "../../utils/board";

const Board = ({ difficulty, onGameOver, gameStatus }) => {
  const [board, setBoard] = React.useState(null);

  useEffect(() => {
    const { rows, cols, mines } = BOARD_SIZE[difficulty];

    const _board = initializeBoard(rows, cols);
    placeMines(_board, mines);

    setBoard(_board);
  }, [difficulty]);

  if (!board || board.length === 0) {
    return <div className="board">Loading...</div>;
  }

  if (!Array.isArray(board) || !board.every((row) => Array.isArray(row))) {
    return <div className="board">Invalid board data</div>;
  }

  const handleCellClick = (rowIndex, colIndex) => {
    console.log(`Cell clicked at row ${rowIndex}, column ${colIndex}`);

    const cell = board[rowIndex][colIndex];
    if (!cell) {
      console.error("Invalid cell data");
      return;
    }

    // Implement cell click logic here, e.g., reveal cell, check for mine, etc.
    if (cell.isRevealed) {
      console.log("Cell already revealed");
      return;
    }

    if (cell.isMarked) {
      console.log("Cell is marked, cannot reveal");
      return;
    }

    // Mark the cell as revealed
    cell.isRevealed = true;
    board[rowIndex][colIndex] = cell;
    setBoard([...board]); // Update the state to trigger re-render

    const minesLeft = board
      .flat()
      .filter((c) => c.hasMine && !c.isMarked).length;

    if (board[rowIndex][colIndex].hasMine) {
      console.log("Game Over! You clicked on a mine.");

      onGameOver(minesLeft);
    }

    // Check win condition (all bombs has been marked or all non-mine cells revealed)
    const areAllNonMinesRevealed = board
      .flat()
      .every((c) => c.isRevealed || c.hasMine);

    if (areAllNonMinesRevealed) {
      // If there are still mines left to mark, mark them
      board.forEach((row) => {
        row.forEach((cell) => {
          if (cell.hasMine && !cell.isMarked) {
            cell.isMarked = true;
          }
        });
      });
      setBoard([...board]); // Update the state to trigger re-render

      console.log("You won the game!");
      onGameOver(0); // No mines left to mark
      return;
    }

    // If the cell is not a mine, you can implement logic to reveal surrounding cells
    if (!cell.hasMine && cell.minesAround === 0) {
      // Recursively reveal surrounding cells
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = rowIndex + i;
          const newCol = colIndex + j;

          // Check bounds and skip the current cell
          if (
            newRow < 0 ||
            newRow >= board.length ||
            newCol < 0 ||
            newCol >= board[0].length ||
            (i === 0 && j === 0)
          ) {
            continue;
          }

          handleCellClick(newRow, newCol);
        }
      }
    }
  };

  const handleMineMarked = (rowIndex, colIndex) => {
    console.log(`Mine marked at row ${rowIndex}, column ${colIndex}`);

    const cell = board[rowIndex][colIndex];
    if (!cell) {
      console.error("Invalid cell data");
      return;
    }

    // Toggle mine marking
    cell.isMarked = !cell.isMarked;
    board[rowIndex][colIndex] = cell;

    setBoard([...board]); // Update the state to trigger re-render

    // check win condition after marking a mine
    const minesLeft = board
      .flat()
      .filter((c) => c.hasMine && !c.isMarked).length;

    if (minesLeft === 0) {
      console.log("All mines marked! You won the game!");
      onGameOver(0); // No mines left to mark
      return;
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <BoardCell
              onClick={() => handleCellClick(rowIndex, colIndex)}
              key={`${rowIndex}-${colIndex}`}
              hasMine={cell.hasMine}
              isRevealed={cell.isRevealed}
              minesAround={cell.minesAround}
              isMarked={cell.isMarked}
              onMineMarked={() => handleMineMarked(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
      <style jsx>{`
        .board {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
          gap: 5px;
          width: 100%;
          max-width: 545px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Board;
