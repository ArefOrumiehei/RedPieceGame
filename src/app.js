const rows = 10;
const cols = 10;
const boardData = [
  ['B', 'W', 'W', 'W', 'B', 'W', 'W', 'W', 'D', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'B', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'B'],
  ['W', 'B', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ['B', 'W', 'W', 'B', 'W', 'W', 'W', 'B', 'W', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ['W', 'B', 'W', 'W', 'W', 'B', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'B', 'W', 'W', 'W', 'W', 'B', 'B', 'W'],
  ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ['W', 'W', 'R', 'W', 'B', 'W', 'W', 'W', 'W', 'W'],
];
let redRow = 9, redCol = 2;
let movesToDestination = 0;
let failedMoves = 0;
let successfulMoves = 0;
let unsuccessfulMoves = 0;
let autoPlayInterval = null;
let currentSpeed = 500;


const boardElement = document.getElementById('board');
function createBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', boardData[row][col]);
      cell.id = `cell-${row}-${col}`;
      boardElement.appendChild(cell);
    }
  }
  document.getElementById(`cell-${redRow}-${redCol}`).classList.add('R');
}
createBoard();

function updateGameMessage(diceRoll, direction, success) {
  const message = `Dice Roll: ${diceRoll} | Direction: ${direction} | ${success ? 'Move Successful (A)' : 'Move Failed (B)'}`;
  document.getElementById("gameMessage").innerText = message;
}

// Check if the move is valid
function isValidMove(newRow, newCol) {
  return newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && boardData[newRow][newCol] !== 'B';
}

// Move the red piece based on dice roll
function moveRed(diceRoll) {
  let newRow = redRow, newCol = redCol;
  let direction = '';

  switch (diceRoll) {
    case 1: case 2: case 3: newRow--; direction = 'UP'; break;
    case 4: newRow++; direction = 'DOWN'; break;
    case 5: newCol++; direction = 'RIGHT'; break;
    case 6: newCol--; direction = 'LEFT'; break;
  }

  if (isValidMove(newRow, newCol)) {
    document.getElementById(`cell-${redRow}-${redCol}`).classList.remove('R');
    redRow = newRow;
    redCol = newCol;
    document.getElementById(`cell-${redRow}-${redCol}`).classList.add('R');
    successfulMoves++;
    movesToDestination++;
    updateGameMessage(diceRoll, direction, true);
  } else {
    unsuccessfulMoves++;
    failedMoves++;
    updateGameMessage(diceRoll, direction, false);
  }

  // Check for destination
  if (boardData[redRow][redCol] === 'D') {
    const totalMoves = successfulMoves + unsuccessfulMoves;
    const successRate = (successfulMoves / (totalMoves + unsuccessfulMoves));
    document.getElementById("gameMessage").innerText = `Reached destination in ${movesToDestination} success moves with ${failedMoves} failed moves!
    Success Rate: ${successRate.toFixed(2)} (${successfulMoves} successful moves out of ${totalMoves})`;
    
    clearInterval(autoPlayInterval);
    document.querySelector('.roll-btn').disabled = true;
    document.querySelector('.autoPlayBtn').disabled = true;
  }
}

// Simulate dice roll
function rollDice() {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  document.getElementById('diceRoll').innerText = `Dice Roll: ${diceRoll}`;
  moveRed(diceRoll);
}

function startAutoPlay() {
  if (!autoPlayInterval) {
    autoPlayInterval = setInterval(rollDice, currentSpeed);
    document.querySelector('.roll-btn').disabled = true;
    document.querySelector('.autoPlayBtn').disabled = true;
  }
}

function updateSpeed(newSpeed) {
  currentSpeed = newSpeed;
  document.getElementById("speedSlider").title = `Speed: ${newSpeed} ms`;
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(rollDice, currentSpeed);
  }
}

function resetGame() {
  redRow = 9;
  redCol = 2;
  movesToDestination = 0;
  failedMoves = 0;
  successfulMoves = 0;
  unsuccessfulMoves = 0;
  clearInterval(autoPlayInterval);
  autoPlayInterval = null;

  createBoard();
  document.getElementById('gameMessage').innerText = 'Game reset. Ready to play!';
  document.getElementById('diceRoll').innerText = 'Dice Roll: 0';
  document.querySelector('.roll-btn').disabled = false;
  document.querySelector('.autoPlayBtn').disabled = false;
}

function toggleMode() {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.container').classList.toggle('dark-mode');

  const icon = document.getElementById('mode-icon');
  
  if (document.body.classList.contains('dark-mode')) {
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-moon">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
      </svg>
    `;
  } else {
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-sun">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
      </svg>
    `;
  }
}

