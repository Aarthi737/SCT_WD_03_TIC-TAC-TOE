const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const winLine = document.getElementById('win-line');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

// Winning combinations
const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

// Handle cell click
function handleCellClick(e) {
    const index = e.target.getAttribute('data-cell-index');
    if (board[index] !== '' || isGameOver) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        isGameOver = true;
        return;
    }

    if (board.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        isGameOver = true;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let combination of winningCombinations) {
        if (combination.every(index => board[index] === currentPlayer)) {
            showWinLine(combination); // show line
            return true;
        }
    }
    return false;
}
function showWinLine(combination) {
    const firstCell = cells[combination[0]];
    const lastCell = cells[combination[2]];
    const boardRect = document.querySelector('.game-board').getBoundingClientRect();

    const startX = firstCell.offsetLeft + firstCell.offsetWidth / 2;
    const startY = firstCell.offsetTop + firstCell.offsetHeight / 2;
    const endX = lastCell.offsetLeft + lastCell.offsetWidth / 2;
    const endY = lastCell.offsetTop + lastCell.offsetHeight / 2;

    const length = Math.hypot(endX - startX, endY - startY);
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    winLine.style.width = `${length}px`;
    winLine.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
}
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameOver = false;
    message.textContent = `Player ${currentPlayer}'s turn`;

    // Reset the win line
    winLine.style.width = '0';
    winLine.style.transform = 'translate(0,0) rotate(0deg)';
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);