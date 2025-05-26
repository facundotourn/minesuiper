// Function to initialize a game board with given rows and columns
/**
 * Initializes a game board with the specified number of rows and columns.
 * Each cell is represented as an object with a value and a revealed state.
 *
 * @param {number} rows - The number of rows in the board.
 * @param {number} cols - The number of columns in the board.
 * @returns {Array} - A 2D array representing the game board.
 */
const initializeBoard = (rows, cols) => {
  const board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        hasMine: false,
        isRevealed: false,
        minesAround: 0,
        isMarked: false,
      });
    }
    board.push(row);
  }

  return board;
};

const placeMines = (board, mines) => {
  let placedMines = 0;
  const rows = board.length;
  const cols = board[0].length;

  while (placedMines < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (!board[row][col].hasMine) {
      board[row][col].hasMine = true;
      placedMines++;

      updateSurroundingCells(board, row, col);
    }
  }
};

const updateSurroundingCells = (board, row, col) => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (
      newRow >= 0 &&
      newRow < board.length &&
      newCol >= 0 &&
      newCol < board[0].length
    ) {
      board[newRow][newCol].minesAround++;
    }
  }
};

export { initializeBoard, placeMines };
