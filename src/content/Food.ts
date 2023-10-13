import Snake from 'Snake.js'
import SquareContent, { ContentKey } from './SquareContent.js'

export default class FoodContent extends SquareContent {
  public key() {
    return ContentKey.food
  }

  public isFood(): boolean {
    return true
  }

  public snakePassingThrough(snake: Snake): void {
    snake.eat()
  }
}
