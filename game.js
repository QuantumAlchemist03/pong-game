// Canvas and context setup
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 8;
const WINNING_SCORE = 10;

// Paddle object
class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = PADDLE_WIDTH;
        this.height = PADDLE_HEIGHT;
        this.dy = 0;
    }

    draw(ctx) {
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowColor = 'transparent';
    }

    update() {
        this.y += this.dy;
        // Wall collision
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
    }
}

// Ball object
class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
        this.dy = (Math.random() - 0.5) * 4;
        this.radius = BALL_SIZE;
    }

    draw(ctx) {
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = 'rgba(255, 107, 107, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowColor = 'transparent';
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Top and bottom wall collision
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.dy = -this.dy;
            this.y = this.y - this.radius < 0 ? this.radius : canvas.height - this.radius;
        }
    }

    checkPaddleCollision(paddle) {
        // Check if ball is moving towards the paddle
        const ballMovingRight = this.dx > 0;
        const ballMovingLeft = this.dx < 0;

        // Check collision bounds
        if (
            this.y > paddle.y &&
            this.y < paddle.y + paddle.height &&
            this.x - this.radius < paddle.x + paddle.width &&
            this.x + this.radius > paddle.x
        ) {
            // Determine if ball is approaching from the correct side
            if ((ballMovingRight && this.x < paddle.x + paddle.width) ||
                (ballMovingLeft && this.x > paddle.x)) {
                
                // Reverse horizontal direction
                this.dx = -this.dx;

                // Add spin based on where the ball hits the paddle
                const collidePoint = this.y - (paddle.y + paddle.height / 2);
                const collideNorm = collidePoint / (paddle.height / 2);
                this.dy = collideNorm * 5;

                // Ensure ball doesn't get stuck
                this.x = this.dx > 0 ? paddle.x - this.radius : paddle.x + paddle.width + this.radius;

                return true;
            }
        }
        return false;
    }

    isOutOfBounds() {
        return this.x < 0 || this.x > canvas.width;
    }
}

// Computer AI
class ComputerAI {
    constructor(paddle) {
        this.paddle = paddle;
        this.speed = 3;
    }

    update(ball) {
        const paddleCenter = this.paddle.y + this.paddle.height / 2;
        const ballY = ball.y;

        // Simple AI: follow the ball
        if (paddleCenter < ballY - 35) {
            this.paddle.dy = this.speed;
        } else if (paddleCenter > ballY + 35) {
            this.paddle.dy = -this.speed;
        } else {
            this.paddle.dy = 0;
        }

        this.paddle.update();
    }
}

// Game state
let playerPaddle = new Paddle(20, canvas.height / 2 - PADDLE_HEIGHT / 2);
let computerPaddle = new Paddle(canvas.width - 30, canvas.height / 2 - PADDLE_HEIGHT / 2);
let ball = new Ball();
let computerAI = new ComputerAI(computerPaddle);

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

// Input handling
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const paddleCenter = playerPaddle.height / 2;
    
    // Smooth mouse control
    if (mouseY < playerPaddle.y + paddleCenter) {
        playerPaddle.dy = -4;
    } else if (mouseY > playerPaddle.y + paddleCenter) {
        playerPaddle.dy = 4;
    } else {
        playerPaddle.dy = 0;
    }
});

// Handle arrow keys
function handleInput() {
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        playerPaddle.dy = -5;
    } else if (keys['ArrowDown'] || keys['s'] || keys['S']) {
        playerPaddle.dy = 5;
    }
}

// Draw center line
function drawCenterLine() {
    ctx.strokeStyle = '#00ff88';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

// Draw game elements
function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    drawCenterLine();

    // Draw paddles
    playerPaddle.draw(ctx);
    computerPaddle.draw(ctx);

    // Draw ball
    ball.draw(ctx);

    // Draw game over message
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff6b6b';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        const winner = playerScore > computerScore ? 'You Win!' : 'Game Over!';
        ctx.fillText(winner, canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = '20px Arial';
        ctx.fillStyle = '#00ff88';
        ctx.fillText('Refresh to play again', canvas.width / 2, canvas.height / 2 + 20);
    }
}

// Update game state
function update() {
    if (gameOver) return;

    handleInput();

    // Update paddles
    playerPaddle.update();
    computerAI.update(ball);

    // Update ball
    ball.update();

    // Check paddle collisions
    ball.checkPaddleCollision(playerPaddle);
    ball.checkPaddleCollision(computerPaddle);

    // Check if ball is out of bounds
    if (ball.isOutOfBounds()) {
        if (ball.x < 0) {
            computerScore++;
        } else {
            playerScore++;
        }

        // Update scores
        document.getElementById('playerScore').textContent = playerScore;
        document.getElementById('computerScore').textContent = computerScore;

        // Check for winner
        if (playerScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
            gameOver = true;
        } else {
            ball.reset();
        }
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
