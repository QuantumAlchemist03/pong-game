# Pong Game 🎮

A classic Pong game built with vanilla HTML, CSS, and JavaScript. Play against a computer AI opponent in this nostalgic arcade game with modern styling.

## Features

- 🎯 **Player vs Computer AI**: Challenge the computer opponent with intelligent ball tracking
- 🎨 **Modern Neon Aesthetic**: Glowing paddles, ball, and center line with a sleek dark theme
- 🏓 **Realistic Physics**: Ball bounces with spin based on paddle impact location
- 📊 **Live Scoreboard**: Real-time score tracking for both players
- ⌨️ **Dual Controls**: Play with mouse movement or arrow keys
- 🏁 **Win Condition**: First to 10 points wins the game
- 📱 **Responsive Design**: Works on different screen sizes

## How to Play

1. Open `index.html` in your web browser
2. Move the **left paddle** (your paddle) using:
   - **Mouse**: Move your cursor up and down
   - **Arrow Keys**: Press Up/Down to move
   - **WASD Keys**: Press W/S to move (alternative)
3. The computer controls the **right paddle**
4. Hit the ball past the computer's paddle to score a point
5. First to **10 points wins**!

## Game Controls

| Action | Input |
|--------|-------|
| Move Paddle Up | Mouse Up / Arrow Up / W |
| Move Paddle Down | Mouse Down / Arrow Down / S |
| Restart Game | Refresh Browser (F5) |

## Files

- **index.html** - Main game file with HTML structure and canvas setup
- **styles.css** - Styling with gradient backgrounds, neon effects, and responsive design
- **game.js** - Complete game logic including:
  - Paddle class with collision detection
  - Ball class with physics simulation
  - ComputerAI class with intelligent tracking
  - Game loop with score tracking

## Game Mechanics

### Ball Physics
- Ball bounces off top and bottom walls
- Ball bounces off paddles with realistic velocity
- Spin is added based on where the ball hits the paddle
- Ball resets to center when it goes out of bounds

### Collision Detection
- **Paddle Collision**: Detects ball contact with paddles and reverses direction
- **Wall Collision**: Ball bounces off top and bottom walls
- **Out of Bounds**: Score is awarded when ball passes a paddle

### AI Opponent
- Tracks the ball's Y position
- Moves smoothly to intercept the ball
- Provides a challenging but beatable difficulty

## Game Stats

- Canvas Size: 800x400 pixels
- Paddle Height: 80 pixels
- Paddle Width: 10 pixels
- Ball Radius: 8 pixels
- Winning Score: 10 points
- AI Speed: 3 pixels per frame

## Technologies Used

- **HTML5** - Canvas API for game rendering
- **CSS3** - Gradient backgrounds, glowing effects, flexbox layout
- **Vanilla JavaScript** - Game logic, physics, and AI implementation

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas
- ES6 Classes
- requestAnimationFrame

## How to Customize

### Change Game Difficulty
Edit `game.js` and modify the AI speed:
```javascript
this.speed = 3; // Increase for harder, decrease for easier
```

### Adjust Paddle Speed
Edit `game.js` and modify paddle movement:
```javascript
playerPaddle.dy = -5; // Increase for faster paddle movement
```

### Change Winning Score
Edit `game.js` and modify:
```javascript
const WINNING_SCORE = 10; // Change to desired score
```

### Customize Colors
Edit `styles.css` to change:
- Paddle color: `.score-value` and Paddle `draw()` method
- Ball color: Ball `draw()` method in `game.js`
- Background: `canvas` background-color and body gradient

## Future Enhancements

- 🎵 Sound effects for paddle hits and scoring
- 🎮 Difficulty levels (Easy, Medium, Hard)
- 👥 Two-player mode (player vs player)
- 📈 Best score tracking with localStorage
- 🌈 Customizable color themes
- 🚀 Power-ups and special abilities

## License

Free to use and modify for personal and educational purposes.

---

Enjoy the game! 🎉
