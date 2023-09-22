/*
✖️💡If growth too challenging, after eating mouse space turns into empty space that can either cause game over or just a simple empty space
✖️💡Maybe after mouse is eaten, random block spaces appear for challenge

✔️⭐Start Button
✔️⭐Up Button
✔️⭐Left Button
✔️⭐Down Button
✔️⭐Right Button
✔️🟣Score Box
✔️🟣Time Box
✔️🟣Game Title
✔️🟣Snake Style
✔️🟣Mouse Style
✖️❓Snake Opens Mouth When Near Mouse?


🤔What would you do differently?
🅰️ I would add more customization to the snake itself. Make it look more....snake-ey?

🤔What are you most proud of?
🅰️ The snake tail trailing in a proper way behind the snake head in the controlSnake function. Essentially, the snake isn't growing the way our eyes perceive it. When the snake head touches the mouse, a new head grows, and the old head trails behind, becoming the "tail". The control function is basically controlling all the heads to follow the controls at the part in the grid that the function was called. 

🤔What would you do next?
🅰️ Modify the game to work on a phone browser, specifically my phone browser. Just for fun.

🤔How did you plan your project?
🅰️ I wanted the premise to work before anything else. Snake can move around game board, mouse can spawn randomly on game board, snake head touches mouse then mouse disappears. This ensures that the "idea" of the game works, and I get the bare minimum done for the project. The next level is other gameplay aspects such as the snake growing, the score, and the timer. This assures another level of gameplay. After that is "making things pretty" by adding a disappearing start/game over/game win button, screen arrows for directional control. These were last minute aesthetics that didn't affect gameplay or function, but made everything nicer to look at.

🤔What did you learn?
🅰️ Simple games like this are full of what I would consider illusions to convince the players that certian events are happening. Aka: snake tail growing.
*/

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
    // console.log("Mouse spawn");
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
    // console.log("Mouse coordinates:", mouseObject.x, mouseObject.y);
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
                lastUpdateTime = timestamp;
            };
            
            canChangeDirection = true;
            
        };
        //request next frame
        requestAnimationFrame(gameLoop);
    };
    // Start the game loop
    requestAnimationFrame(gameLoop);

// gameLoop();

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
// console.log("test");
});



function controlSnake() {
    // Create a new head for the snake based on the current direction
    const newHead = { ...snake[0] };

    if (direction === 'up') {
        newHead.y -= gridSize;
        // console.log("move up");
    } else if (direction === 'down') {
        newHead.y += gridSize;
        // console.log("move down");
    } else if (direction === 'left') {
        newHead.x -= gridSize;
        // console.log("move left");
    } else if (direction === 'right') {
        newHead.x += gridSize;
        // console.log("move right");
    };

    // If the snake's head is out of bounds, it's a collision with the wall
    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
        gameOver();
        return;
    };

    // Add the new head to the beginning of the snake
    snake.unshift(newHead);

    // console.log("New head x:", newHead.x);
    // console.log("New head y:", newHead.y);
    // console.log("Canvas width:", canvas.width);
    // console.log("Canvas height:", canvas.height);

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