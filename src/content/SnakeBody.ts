import SquareContent, { ContentKey } from './SquareContent.js'
import Snake from '../Snake.js'
import Game from '../Game.js'

export default class SnakeBody extends SquareContent {
  public key(): ContentKey {
    return ContentKey.snake
  }

  public snakePassingThrough(snake: Snake, game: Game): void {
    game.lose()
  }
}
