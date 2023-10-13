import SquareContent, { ContentKey } from './SquareContent.js';
export default class SnakeBody extends SquareContent {
    key() {
        return ContentKey.snake;
    }
    snakePassingThrough(snake, game) {
        game.lose();
    }
}
