import SquareContent, { ContentKey } from './SquareContent.js'

export default class SnakeBody extends SquareContent {
  public key(): ContentKey {
    return ContentKey.snake
  }
}
