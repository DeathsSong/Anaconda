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

const gridSize = 20;

const snakeColor = 'green';

const mouse ={
    x: 0,
    y: 0,
};

const mouseImage = new Image();
mouseImage.src = 'mouse-transparent-background-smol.png';
mouseImage.onload = function () {
    gameLoop();
}




function createGameBoard() {
    //Function to set up and display the play area for the game
    context.fillStyle = 'rgb(255, 220, 159)';
    for (let row = 0; row < canvas.height; row += gridSize) {
        for (let col = 0; col < canvas.clientWidth; col += gridSize) {
            context.fillRect(col, row, gridSize, gridSize);
        };
    };
};

function createSnake(snakePieces) {
    //Create the snake
    context.fillStyle = 'green';
    for (const piece of snake) {
        context.fillRect(piece.x, piece.y, gridSize, gridSize);
    };
    //Keep track of snake pieces (aka: when it grows)
    //Creates each piece as the snake grows
};

function createMouse(mouseObject) {
    //Generate the mice in random, unoccupied positions on the board
    mouseObject.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    mouseObject.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    //Draw the mouse image at the mouse's position with the specified dimensions
    context.drawImage(mouseImage, mouseObject.x, mouseObject.y, gridSize, gridSize);
};

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

function gameLoop() {
    //Make the game loop
    clearCanvas();
    createGameBoard();
    createMouse(mouse);
    createSnake(snake);
    requestAnimationFrame(gameLoop);
    //Call other functions in a specific order
};

function keepScore() {
    //Keep game score
};

function keepTime() {
    //Keep game play time
};
