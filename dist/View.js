import { ContentKey } from './content/SquareContent.js';
const SQUARES_OFFSET = 1;
const SQUARE_SIZE = 40;
export default class View {
    constructor(canvas, game) {
        const ctx = canvas.getContext('2d');
        if (!ctx)
            throw new Error('2d context not supported');
        this.game = game;
        this.canvas = canvas;
        this.ctx = ctx;
    }
    start() {
        this.setInitialCanvasSize();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    setInitialCanvasSize() {
        const { ROW_LENGTH, COL_LENGTH } = this.game.board.getSize();
        this.canvas.width = ROW_LENGTH * SQUARE_SIZE + ROW_LENGTH * SQUARES_OFFSET;
        this.canvas.height = COL_LENGTH * SQUARE_SIZE + COL_LENGTH * SQUARES_OFFSET;
    }
    gameLoop() {
        this.clearCanvas();
        if (!this.game.playing) {
            this.drawLoseMessage();
            return;
        }
        this.game.tick();
        this.drawSquares();
        setTimeout(() => requestAnimationFrame(this.gameLoop.bind(this)), 200);
    }
    drawLoseMessage() {
        console.log('DRAWING lose message');
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText('You lose. Press enter to keep playing.', 200, 200);
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawRect(x, y, w, h, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }
    drawCircle(centerX, centerY, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    drawSquares() {
        const squares = this.game.board.squares;
        for (let i = 0; i < squares.length; i++) {
            for (let j = 0; j < squares[i].length; j++) {
                const square = squares[i][j];
                this.drawSquare(i, j, 'gray');
                this.drawSquareContent(square, i, j);
            }
        }
    }
    drawSquare(i, j, color) {
        this.drawRect(j * SQUARE_SIZE + j * SQUARES_OFFSET, i * SQUARE_SIZE + i * SQUARES_OFFSET, SQUARE_SIZE, SQUARE_SIZE, color);
    }
    drawSquareContent(square, i, j) {
        const contentKey = square.content.key();
        const mapKeyWithMethod = {
            [ContentKey.no]: () => { },
            [ContentKey.food]: this.drawFoodContent.bind(this),
            [ContentKey.snake]: this.drawSnakeContent.bind(this),
        };
        const method = mapKeyWithMethod[contentKey];
        method(square, i, j);
    }
    drawFoodContent(square, i, j) {
        const squareX = j * SQUARE_SIZE + j * SQUARES_OFFSET;
        const squareY = i * SQUARE_SIZE + i * SQUARES_OFFSET;
        const centerX = squareX + SQUARE_SIZE / 2;
        const centerY = squareY + SQUARE_SIZE / 2;
        this.drawCircle(centerX, centerY, SQUARE_SIZE / 4, 'red');
    }
    drawSnakeContent(square, i, j) {
        this.drawSquare(i, j, 'green');
    }
}
