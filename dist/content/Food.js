import SquareContent, { ContentKey } from './SquareContent.js';
export default class FoodContent extends SquareContent {
    key() {
        return ContentKey.food;
    }
    isFood() {
        return true;
    }
    snakePassingThrough(snake) {
        snake.eat();
    }
}
