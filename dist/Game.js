import Snake from './Snake.js';
import Board from './Board.js';
import View from './View.js';
import SnakeBody from './content/SnakeBody.js';
import FoodContent from './content/Food.js';
export default class Game {
    constructor(canvas) {
        this.playing = true;
        this.board = new Board(20, 20);
        this.snake = this.spawnSnake();
        this.view = new View(canvas, this);
    }
    spawnSnake() {
        const firstSnakeBody = new SnakeBody();
        const { ROW_LENGTH, COL_LENGTH } = this.board.getSize();
        const med_i = Math.floor(ROW_LENGTH / 2);
        const med_j = Math.floor(COL_LENGTH / 2);
        this.board.squares[med_i][med_j].setContent(firstSnakeBody);
        return new Snake(firstSnakeBody, this.board);
    }
    start() {
        this.view.start();
    }
    tick() {
        if (!this.playing)
            return;
        const boardHasFood = this.board.hasFoodInAnySquare();
        if (!boardHasFood)
            this.spawnFood();
        this.snake.tick(this);
    }
    spawnFood() {
        const { ROW_LENGTH, COL_LENGTH } = this.board.getSize();
        const i = this.randInt(0, ROW_LENGTH - 1);
        const j = this.randInt(0, COL_LENGTH - 1);
        this.board.squares[i][j].setContent(new FoodContent());
    }
    randInt(min, max) {
        if (min > max) {
            throw new Error('min must be less than or equal to max');
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    lose() {
        this.playing = false;
    }
}
