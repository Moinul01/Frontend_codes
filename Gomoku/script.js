const BOARD_SIZE = 15;

let board = [];
let currentPlayer = "black"; // "black" or "white"
let gameOver = false;

const boardEl = document.getElementById("board");
const statusBar = document.getElementById("statusBar");
const currentPlayerLabel = document.getElementById("currentPlayerLabel");
const resetBtn = document.getElementById("resetBtn");

function initBoard() {
  board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(null)
  );
  gameOver = false;
  currentPlayer = "black";
  currentPlayerLabel.textContent = "Black ●";
  currentPlayerLabel.style.color = "#facc15";

  boardEl.innerHTML = "";

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;

      const stone = document.createElement("div");
      stone.classList.add("stone");
      cell.appendChild(stone);

      cell.addEventListener("click", onCellClick);
      boardEl.appendChild(cell);
    }
  }
}

function onCellClick(e) {
  if (gameOver) return;

  const cell = e.currentTarget;
  const r = parseInt(cell.dataset.row, 10);
  const c = parseInt(cell.dataset.col, 10);

  if (board[r][c] !== null) return;

  board[r][c] = currentPlayer;

  const stone = cell.querySelector(".stone");
  stone.classList.add(currentPlayer, "visible");

  const winningCells = checkWin(r, c, currentPlayer);

  if (winningCells) {
    gameOver = true;
    winningCells.forEach(([wr, wc]) => {
      const winCell = getCellElement(wr, wc);
      winCell.classList.add("win");
    });
    statusBar.textContent =
      (currentPlayer === "black" ? "Black" : "White") + " wins! 🎉";
    return;
  }

  if (isBoardFull()) {
    gameOver = true;
    statusBar.textContent = "It's a draw.";
    return;
  }

  currentPlayer = currentPlayer === "black" ? "white" : "black";
  currentPlayerLabel.textContent =
    currentPlayer === "black" ? "Black ●" : "White ○";
}

function getCellElement(r, c) {
  return boardEl.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
}

// Check for 5 in a row
function checkWin(row, col, player) {
  const directions = [
    [1, 0], // vertical
    [0, 1], // horizontal
    [1, 1], // diagonal down-right
    [1, -1], // diagonal down-left
  ];

  for (const [dr, dc] of directions) {
    const cells = [[row, col]];

    // go one way
    let r = row + dr;
    let c = col + dc;
    while (isOnBoard(r, c) && board[r][c] === player) {
      cells.push([r, c]);
      r += dr;
      c += dc;
    }

    // go opposite way
    r = row - dr;
    c = col - dc;
    while (isOnBoard(r, c) && board[r][c] === player) {
      cells.unshift([r, c]);
      r -= dr;
      c -= dc;
    }

    if (cells.length >= 5) {
      return cells;
    }
  }
  return null;
}

function isOnBoard(r, c) {
  return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;
}

function isBoardFull() {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === null) return false;
    }
  }
  return true;
}

// Reset button
resetBtn.addEventListener("click", () => {
  statusBar.innerHTML =
    'Turn: <span id="currentPlayerLabel">Black ●</span>';
  const span = statusBar.querySelector("#currentPlayerLabel");
  if (span) {
    span.style.color = "#facc15";
  }
  initBoard();
});

// Initialize
initBoard();
