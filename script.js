const board = document.getElementById("board");
const resetButton = document.getElementById("reset");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const popupResetButton = document.getElementById("popup-reset");
const xWinsDisplay = document.getElementById("x-wins");
const oWinsDisplay = document.getElementById("o-wins");
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameEnded = false;
let xWins = 0;
let oWins = 0;

document.addEventListener('DOMContentLoaded', () => {
    renderBoard();
});

function renderBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell; // Ensure cells are empty strings
        cellElement.addEventListener("click", () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (!gameEnded && boardState[index] === "") {
        boardState[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            showPopup(`Player ${currentPlayer} wins!`);
            if (currentPlayer === "X") {
                xWins++;
                xWinsDisplay.textContent = `X Wins: ${xWins}`;
            } else {
                oWins++;
                oWinsDisplay.textContent = `O Wins: ${oWins}`;
            }
        } else if (checkDraw()) {
            showPopup("It's a draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        return combo.every(index => boardState[index] === currentPlayer);
    });
}

function checkDraw() {
    return boardState.every(cell => cell !== "") && !checkWinner();
}

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = "block";
    gameEnded = true;
}

function resetBoard() {
    currentPlayer = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    renderBoard();
    popup.style.display = "none";
    gameEnded = false;
}

function resetGame() {
    resetBoard();
    xWins = 0;
    oWins = 0;
    xWinsDisplay.textContent = `X Wins: ${xWins}`;
    oWinsDisplay.textContent = `O Wins: ${oWins}`;
}

resetButton.addEventListener("click", resetGame);
popupResetButton.addEventListener("click", resetBoard);
