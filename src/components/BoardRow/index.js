import React from "react";

const BoardRow = ({ children }) => {
  return (
    <div className="board-row">
      {children}
      <style jsx>{`
        .board-row {
          display: flex;
          width: 100%;
          justify-content: center;
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default BoardRow;
