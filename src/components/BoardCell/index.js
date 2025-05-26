import React from "react";

const BoardCell = ({
  hasMine,
  isRevealed,
  minesAround,
  onClick,
  isMarked,
  onMineMarked,
}) => {
  const [pressTimer, setPressTimer] = React.useState(null);
  const [isLongPress, setIsLongPress] = React.useState(false);

  const handleMouseDown = () => {
    setIsLongPress(false);

    const timer = setTimeout(() => {
      setIsLongPress(true);
      if (onMineMarked) {
        onMineMarked();
      }
    }, 250); // Trigger long press after 500ms

    setPressTimer(timer);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
    setPressTimer(null);
  };

  const handleClick = () => {
    if (!isRevealed && !isLongPress && onClick) {
      onClick();
    }
  };

  const getCellContent = () => {
    if (isRevealed) {
      if (hasMine) {
        return "💣"; // Display a mine
      } else if (minesAround > 0) {
        return minesAround; // Display number of mines around
      } else {
        return ""; // Empty cell
      }
    }

    if (isMarked) {
      return "🚩"; // Display a flag if marked
    }

    return ""; // Cell is not revealed
  };

  return (
    <div
      className={`board-cell ${isRevealed ? "revealed" : ""} ${
        hasMine ? "mine" : ""
      } mines-around-${minesAround}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {getCellContent()}
      <style jsx>{`
        .board-cell {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
          background-color: ${"#e0e0e0"};
          font-size: 24px;
          font-weight: bold;
          margin-top: 3px;
        }

        /* text-color by cell content */
        .mines-around-1 {
          color: #1a73e8; /* Blue */
        }

        .mines-around-2 {
          color: #34a853; /* Green */
        }

        .mines-around-3 {
          color: #ea4335; /* Red */
        }

        .mines-around-4 {
          color: #fbbc05; /* Yellow */
        }

        .mines-around-5 {
          color: #d93025; /* Dark Red */
        }

        .mines-around-6 {
          color: #f4511e; /* Orange */
        }

        .mines-around-7 {
          color: #ab47bc; /* Purple */
        }

        .mines-around-8 {
          color: #616161; /* Gray */
        }

        .revealed.mine {
          background-color: #ffcccc;
        }
        .revealed {
          cursor: default;
          background-color: #d0d0d0;
        }
      `}</style>
    </div>
  );
};

export default BoardCell;
