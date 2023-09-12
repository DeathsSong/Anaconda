/*
⭐Start Button
⭐Up Button
⭐Left Button
⭐Down Button
⭐Right Button
🟣Score Box
🟣Time Box
🟣Game Title
🟣Snake Style
🟣Mouse Style
❓Snake Opens Mouth When Near Mouse?
*/

const buttonStart = document.getElementById('button-start');

const canvas = document.getElementById('gameCanvas');

const context = canvas.getContext('2d');

const snakeColor = 'green';

const mouseImage = document.getElementsByClassName('mouse')

const gridSize = 20;


function createGameBoard() {
    //Function to set up and display the play area for the game
    for (let row = 0; row < canvas.height; row += gridSize) {

    }
}

function createSnake(snakePieces) {
    //Create the snake
    //Keep track of snake pieces (aka: when it grows)
    //Creates each piece as the snake grows
}

function createMouse(mousePosition) {
    //Create the mice
    //Generate the mice in random, unoccupied positions on the board
}

function gameLoop() {
    //Make the game loop
    //Call other functions in a specific order
}