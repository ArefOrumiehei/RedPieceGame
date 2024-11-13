#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>

using namespace std;

const int rows = 10;
const int cols = 10;

vector<vector<char>> board = {
    {'B', 'W', 'W', 'W', 'B', 'W', 'W', 'W', 'D', 'W'},
    {'W', 'W', 'W', 'W', 'W', 'B', 'W', 'W', 'W', 'W'},
    {'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'B'},
    {'W', 'B', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'},
    {'B', 'W', 'W', 'B', 'W', 'W', 'W', 'B', 'W', 'W'},
    {'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'},
    {'W', 'B', 'W', 'W', 'W', 'B', 'W', 'W', 'W', 'W'},
    {'W', 'W', 'B', 'W', 'W', 'W', 'W', 'B', 'B', 'W'},
    {'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'},
    {'W', 'W', 'R', 'W', 'B', 'W', 'W', 'W', 'W', 'W'},
};

// Red piece positions
int redRow = 9, redCol = 2;
int movesToDestination = 0;
int failedMoves = 0;

// Checking if the piece is inside the table and on the white house
bool isValidMove(int row, int col) {
    return row >= 0 && row < rows && col >= 0 && col < cols && board[row][col] != 'B';
}

// The movement of the piece based on the number of dice
void moveRed(int diceRoll) {
    int newRow = redRow, newCol = redCol;
    string direction;

    // Determine the direction based on dice roll
    switch (diceRoll) {
        case 1: case 2: case 3: newRow--; direction = "UP"; break;
        case 4: newRow++; direction = "DOWN"; break;
        case 5: newCol++; direction = "RIGHT"; break;
        case 6: newCol--; direction = "LEFT"; break;
    }

    // Check if the move is valid
    if (isValidMove(newRow, newCol)) {
        redRow = newRow;
        redCol = newCol;
        movesToDestination++;
        cout << "Dice Roll: " << diceRoll << " | Direction: " << direction << " | New Position: (" << redRow << ", " << redCol << ")\n";
    } else {
        failedMoves++;
        cout << "Dice Roll: " << diceRoll << " | Direction: " << direction << " | Move Failed\n";
    }
}

int main() {
    srand(time(0));

    // Perform movements until reaching the destination
    while (board[redRow][redCol] != 'D') {
        int diceRoll = rand() % 6 + 1;
        moveRed(diceRoll);
    }

    cout << "Reached destination in " << movesToDestination << " moves.\n";
    cout << "Failed moves: " << failedMoves << endl;

    return 0;
}
