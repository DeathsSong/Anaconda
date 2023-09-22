const startButtonBox = document.getElementsByClassName('start-button-box');

const buttonStart = document.getElementById('button-start');

const gameOverPopup = document.getElementById('gameOverPopup');

const resetButton = document.getElementById('resetButton');

const canvas = document.getElementById('gameCanvas');

const context = canvas.getContext('2d');

const gridSize = 20;

let snake = [{x:20, y:20}];

const snakeHead = snake[0];

let direction = 'right';

let gameState = 'stopped';

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
    context.drawImage(mouseImage, mouseObject.x, mouseObject.y, gridSize, gridSize);
};

function clearCanvas() {
    context.clearRect(0, 0, 500, 500);
};

let lastUpdateTime = 0;
const updateRate = 200; // Adjust this value for the desired speed.

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
                lastUpdateTime = timestamp;
            };
            
            canChangeDirection = true;
            
        };
        //request next frame
        requestAnimationFrame(gameLoop);
    };
    // Start the game loop
    requestAnimationFrame(gameLoop);

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
    };
    canChangeDirection = false;
};
});



function controlSnake() {
    // Create a new head for the snake based on the current direction
    const newHead = { ...snake[0] };

    if (direction === 'up') {
        newHead.y -= gridSize;
    } else if (direction === 'down') {
        newHead.y += gridSize;
    } else if (direction === 'left') {
        newHead.x -= gridSize;
    } else if (direction === 'right') {
        newHead.x += gridSize;
    };

    // If the snake's head is out of bounds, it's a collision with the wall
    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
        gameOver();
        return;
    };

    // Add the new head to the beginning of the snake
    snake.unshift(newHead);

    checkMouseCollision();

    if (!ateMouse) {
        // If the snake "ate" a mouse, a new head gets added to the array
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
        score += 10;
        document.getElementById('score').textContent = `Score: ${score}`;
        checkWinCondition();
    } else {
        ateMouse = false;
    };
};

function gameOver() {
    //Write function with a pop out box that says "game over" and has a button with the words "Try again?"
    clearInterval(gameInterval);
    gameState = 'over';
    gameOverPopup.style.display = 'block';

};

function resetGame() {
    gameState = 'running';
    snake = [{ x: 20, y: 20 }]; // Reset the snake to its initial position
    direction = 'right'; //Make sure snake starts off in the right direction
    spawnMouse(); // Place a new mouse on the board
    gameOverPopup.style.display = 'none';

    gameLoop();
}

resetButton.addEventListener('click', function () {
    resetGame();
    resetTimer();
    resetScore();
});


//Mouse/screen button controls
document.getElementById('up-arrow').addEventListener('click', function () {
    changeDirection('up');
});

document.getElementById('left-arrow').addEventListener('click', function () {
    changeDirection('left');
});

document.getElementById('down-arrow').addEventListener('click', function () {
    changeDirection('down');
});

document.getElementById('right-arrow').addEventListener('click', function () {
    changeDirection('right');
});

function changeDirection(newDirection) {
    if (canChangeDirection) {
        if (
            (newDirection === 'up' && direction !== 'down') ||
            (newDirection === 'down' && direction !== 'up') ||
            (newDirection === 'left' && direction !== 'right') ||
            (newDirection === 'right' && direction !== 'left')
        ) {
            direction = newDirection;
        };
        canChangeDirection = false;
    };
};

let score = 0;

let startTime = 0;

let gameInterval;

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed seconds
    document.getElementById('timer').textContent = `Time: ${elapsedTime}`;
};

function startGame() {
    score = 0;
    startTime = Date.now();
    gameInterval = setInterval(updateTimer, 1000); //Updates timer every second
    snake = [{ x: 20, y: 20 }];
    direction = 'right'; // Make sure the snake starts off in the right direction

    // Reset other game state variables as needed
    gameState = 'running';
    gameOverPopup.style.display = 'none';

    // Spawn the initial mouse
    spawnMouse();

    // Start the game loop
    gameLoop();

    startButtonBox[0].style.display = 'none';
};

buttonStart.addEventListener('click', function () {
    startGame();
    gameState = 'running';
    gameLoop();
});

function resetTimer() {
    clearInterval(gameInterval); // Clear the previous interval
    startTime = Date.now(); // Reset the start time
    gameInterval = setInterval(updateTimer, 1000); // Start a new interval to update the timer
    updateTimer(); // Update the timer immediately
};

function resetScore() {
    score = 0;
    document.getElementById('score').textContent = `Score: 0`;
};

function checkWinCondition() {
    if (score >= 100) {
        clearInterval(gameInterval);
        // Display the win pop-up
        winPopup.style.display = 'block';
        // Stop the game or perform any other actions as needed
        gameState = 'over';
    };
};

const winPopup = document.getElementById('winPopup');
const playAgainButton = document.getElementById('playAgainButton');

playAgainButton.addEventListener('click', function () {
    resetGame();
    resetTimer();
    resetScore();
    winPopup.style.display = 'none';
});