let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const messageElement = document.getElementById('message');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

function makeMove(cellIndex) {
  if (gameBoard[cellIndex] === '' && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;

    if (checkWin()) {
      endGame(`${currentPlayer} wins!`);
    } else if (checkTie()) {
      endGame("It's a tie!");
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer() {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
  messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function checkTie() {
  return gameBoard.every(cell => cell !== '');
}

function endGame(message) {
  var a = true;
  gameActive = false;
  messageElement.textContent = message;
  resetButton.textContent = "Replay";
  
}

function reset() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  messageElement.textContent = 'Tap on any box to start the game';
  resetButton.textContent = 'Reset';

  cells.forEach(cell => {
    cell.textContent = '';
  });
}

// Event listeners
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => makeMove(index));
});

resetButton.addEventListener('click', reset);
