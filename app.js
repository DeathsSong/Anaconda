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

const gameOverPopup = document.getElementById('gameOverPopup');

const resetButton = document.getElementById('resetButton');

const canvas = document.getElementById('gameCanvas');

const context = canvas.getContext('2d');

const gridSize = 20;

let snake = [{x:20, y:20}];

const snakeHead = snake[0];

let direction = 'right';

let gameState = 'running';

const mouse ={
    x: 0,
    y: 0,
};

function spawnMouse() {
    mouse.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    mouse.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

const mouseImage = new Image();
mouseImage.src = 'mouse-transparent-background-smol.png';
mouseImage.onload = function () { //mouse appears every time game is loaded fix
    console.log("Mouse spawn");
    spawnMouse();
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

function createSnake() {
    //Create the snake
    context.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            context.fillStyle = 'rgb(99, 231, 59)'; //Head color
        } else {
            context.fillStyle = 'green'; //Body color
        };
        context.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    };
};

function createMouse(mouseObject) {
    console.log("Mouse coordinates:", mouseObject.x, mouseObject.y);
    //Generate the mice in random, unoccupied positions on the board
    // mouseObject.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    // mouseObject.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    //Draw the mouse image at the mouse's position with the specified dimensions
    context.drawImage(mouseImage, mouseObject.x, mouseObject.y, gridSize, gridSize);
    // console.log("creating mouse");
};

function clearCanvas() {
    context.clearRect(0, 0, 500, 500);
};

let lastUpdateTime = 0;
const updateRate = 200; // Adjust this value for the desired speed.

// let lastTimestamp = 0;

// const frameRate = 10; // Adjust this value for the desired frame rate (e.g., 10 frames per second)

function gameLoop(timestamp) {
    if (gameState === 'running') {
            const deltaTime = timestamp - lastUpdateTime;
            if (deltaTime >= updateRate) {
                clearCanvas();
                createGameBoard();
                controlSnake();
                createMouse(mouse);
                createSnake(snake);
                checkMouseCollision();
                lastUpdateTime = timestamp
            }
            
            canChangeDirection = true;
            
        }
        //request next frame
        requestAnimationFrame(gameLoop);
    }
    // Start the game loop
    requestAnimationFrame(gameLoop);

// gameLoop();

function keepScore() {
    //Keep game score
};

function keepTime() {
    //Keep game play time
};

let canChangeDirection = true;

document.addEventListener('keydown', function (event) {
    if (canChangeDirection) {
    if (event.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (event.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (event.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (event.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
    canChangeDirection = false;
}
// console.log("test");
});



function controlSnake() {
    // Create a new head for the snake based on the current direction
    const newHead = { ...snake[0] };

    if (direction === 'up') {
        newHead.y -= gridSize;
        console.log("move up");
    } else if (direction === 'down') {
        newHead.y += gridSize;
        console.log("move down");
    } else if (direction === 'left') {
        newHead.x -= gridSize;
        console.log("move left");
    } else if (direction === 'right') {
        newHead.x += gridSize;
        console.log("move right");
    };

    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
        // If the snake's head is out of bounds, it's a collision with the wall
        gameOver();
        return;
    }

    // Add the new head to the beginning of the snake
    snake.unshift(newHead);

    console.log("New head x:", newHead.x);
    console.log("New head y:", newHead.y);
    console.log("Canvas width:", canvas.width);
    console.log("Canvas height:", canvas.height);

    checkMouseCollision();

    if (!ateMouse) {
        // If the snake didn't eat the mouse, remove the last element to keep the length constant
        snake.pop();
    };
    for (let i = 1; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            // Snake collided with itself, it's "dead"
            gameOver();
            return; // Stop further processing
        }
        if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
            // If snake hits walls, game over
            gameOver();
            return;
        };
    };
};

let ateMouse = false;



function checkMouseCollision() {
    // Check if both the snake and the mouse are in the same square
    if (snake[0].x === mouse.x && snake[0].y === mouse.y) {
        ateMouse = true;
        spawnMouse(); // Call this when the snake consumes the mouse
    } else {
        ateMouse = false;
    };
};

function gameOver() {
    //Write function with a pop out box that says "game over" and has a button with the words "Try again?"
    gameState = 'over';
    gameOverPopup.style.display = 'block';

};

function resetGame() {
    gameState = 'running';
    snake = [{ x: 20, y: 20 }]; // Reset the snake to its initial position
    direction = 'right';
    spawnMouse(); // Place a new mouse on the board
    gameOverPopup.style.display = 'none';
    gameLoop();
}

resetButton.addEventListener('click', function () {
    resetGame();
});