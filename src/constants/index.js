const GAME_DIFFICULTY = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

const BOARD_SIZE = {
  [GAME_DIFFICULTY.EASY]: { rows: 10, cols: 10, mines: 10 },
  [GAME_DIFFICULTY.MEDIUM]: { rows: 16, cols: 16, mines: 40 },
  [GAME_DIFFICULTY.HARD]: { rows: 24, cols: 24, mines: 99 },
};

const GAME_STATUS = {
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
};

export { GAME_DIFFICULTY, BOARD_SIZE, GAME_STATUS };
