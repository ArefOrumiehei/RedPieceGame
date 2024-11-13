# Red Piece Game Simulation

This project is a simple board game simulation in C++ where a piece moves on a 10x10 board, aiming to reach a designated destination. The movement is based on dice rolls, with each roll determining the direction the piece moves. The board contains obstacles, making certain moves invalid and adding complexity to reaching the destination.

## Project Structure
The project has the following structure:

- **HTML and CSS**: The front end contains a minimal layout for displaying the game board and controls.
- **JavaScript**: Manages game settings like speed adjustment and the toggle between Dark and Light modes.
- **C++ Code**: The main game logic and movement algorithm for the piece.

## Goal of the Algorithm
The C++ algorithm simulates random movement on a board, where the piece navigates around obstacles to reach a destination. It uses dice rolls to introduce randomness in direction selection, reflecting chance-based pathfinding. The algorithm calculates successful and failed moves, with the ultimate goal of finding an efficient path to the destination.

## Table of Contents
- [Red Piece Game Simulation](#red-piece-game-simulation)
  - [Project Structure](#project-structure)
  - [Goal of the Algorithm](#goal-of-the-algorithm)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [How It Works](#how-it-works)
  - [Game Rules and Objectives](#game-rules-and-objectives)
  - [C++ Code Explanation](#c-code-explanation)
    - [Constants and Board Setup](#constants-and-board-setup)
    - [Move Validation](#move-validation)
    - [Movement Logic](#movement-logic)
    - [Main Function and Dice Roll Simulation](#main-function-and-dice-roll-simulation)
  - [Usage](#usage)
    - [Running the Web Interface](#running-the-web-interface)
    - [Running the C++ Code](#running-the-c-code)
  - [License](#license)

---

## Overview
This project simulates a basic board game where a piece (represented as "Red") navigates a 10x10 board grid filled with different cell types:
- **W** (White) - Passable cells.
- **B** (Black) - Blocked cells that cannot be crossed.
- **D** (Destination) - Target cell that the piece must reach.
- **R** (Red) - The starting position of the red piece.

The game includes a web-based interface and C++ code that performs the core movement logic for the piece.

## How It Works
The Red piece begins at a designated start position and attempts to reach the Destination cell (D) by following dice rolls that determine its movement:
- A dice roll of 1, 2, or 3 moves the piece **UP**.
- A dice roll of 4 moves the piece **DOWN**.
- A dice roll of 5 moves the piece **RIGHT**.
- A dice roll of 6 moves the piece **LEFT**.

The program validates each move to ensure it stays within the bounds and doesn’t land on a black (B) cell.

## Game Rules and Objectives
1. The game begins with the Red piece at a starting position (`R`).
2. Each turn, a dice roll determines a potential move direction.
3. The piece moves only if the new cell is within the board bounds and isn’t blocked.
4. If a move is valid, the piece moves; otherwise, it remains in place and logs a failed move.
5. The objective is to reach the Destination (`D`) cell with the fewest moves.

## C++ Code Explanation

### Constants and Board Setup
```cpp
const int rows = 10;
const int cols = 10;

vector<vector<char>> board = {
    {'B', 'W', 'W', 'W', 'B', 'W', 'W', 'W', 'D', 'W'},
    ...
};
int redRow = 9, redCol = 2;
int movesToDestination = 0;
int failedMoves = 0;
```
- **rows** and **cols**: Define the board dimensions.
- **board**: A 2D vector representing the board cells.
- **redRow** and **redCol**: Track the Red piece’s position on the board.
- **movesToDestination** and **failedMoves**: Counters for successful and failed moves.

### Move Validation
```cpp
bool isValidMove(int row, int col) {
    return row >= 0 && row < rows && col >= 0 && col < cols && board[row][col] != 'B';
}
```
- Checks that the new position is within bounds and not a blocked cell (`B`).

### Movement Logic
```cpp
void moveRed(int diceRoll) {
    int newRow = redRow, newCol = redCol;
    switch (diceRoll) {
        case 1: case 2: case 3: newRow--; break;
        case 4: newRow++; break;
        case 5: newCol++; break;
        case 6: newCol--; break;
    }
    if (isValidMove(newRow, newCol)) {
        redRow = newRow;
        redCol = newCol;
        movesToDestination++;
        cout << "Dice Roll: " << diceRoll << " | New Position: (" << redRow << ", " << redCol << ")\n";
    } else {
        failedMoves++;
        cout << "Dice Roll: " << diceRoll << " | Move Failed\n";
    }
}
```
- **newRow** and **newCol**: Calculate the next position based on the dice roll.
- **switch statement**: Adjusts `newRow` and `newCol` based on dice roll.
- **isValidMove** check: Moves the piece if the new position is valid, else counts as a failed move.

### Main Function and Dice Roll Simulation
```cpp
int main() {
    srand(time(0));
    while (board[redRow][redCol] != 'D') {
        int diceRoll = rand() % 6 + 1;
        moveRed(diceRoll);
    }
    cout << "Reached destination in " << movesToDestination << " moves.\n";
    cout << "Failed moves: " << failedMoves << endl;
    return 0;
}
```
- **srand(time(0))**: Initializes the random number generator.
- **while loop**: Continues until the Red piece reaches the Destination (`D`) cell.
- **diceRoll**: Simulates dice rolls for determining the direction.

## Usage
### Running the Web Interface
To use the game in a web environment:
1. Clone the repository.
2. Open `index.html` in a browser to start the game with UI controls.

### Running the C++ Code
To run the C++ simulation:
1. Compile the code using a C++ compiler:
   ```bash
   g++ -o boardgame boardgame.cpp
   ```
2. Execute the compiled program:
   ```bash
   ./boardgame
   ```

## License
This project is open-source and available under the [MIT License](LICENSE).

---