/*
💡If growth too challenging, after eating mouse space turns into empty space that can either cause game over or just a simple empty space
💡Maybe after mouse is eaten, random block spaces appear for challenge

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

const snake = [{x:2, y:2}];

const mouse ={
    x: 0,
    y: 0,
};

const mouseImage = new Image();
mouseImage.src = 'mouse-transparent-background-smol.png';
mouseImage.onload = function () { //mouse appears every time game is loaded fix
    gameLoop();
};




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
    moveSnake();
    checkMouseCollision();
    checkCollision();
    requestAnimationFrame(gameLoop);
    //Call other functions in a specific order
};

function keepScore() {
    //Keep game score
};

function keepTime() {
    //Keep game play time
};

function controlSnake() {
    //Creates each piece as the snake grows
    //Controls snake
    const head = {...snake[0]};
    if (direction === 'up') {
        head.y -= gridSize;
    } else if (direction === 'down') {
        head.y += gridSize;
    } else if (direction === 'left') {
        head.x -= gridSize;
    } else if (direction === 'right') {
        head.x += gridSize;
    };
    snake.unshift(head);
    if (!ateMouse) {
        snake.pop();
    }
}

let ateMouse = false;

function checkMouseCollision() {
    //Check if both the snake and the mouse are in the same square
    if (snake[0].x === mouse.x && snake[0].y === mouse.y) {
        ateMouse = true;
        food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    } else {
        ateMouse = false;
    };
};