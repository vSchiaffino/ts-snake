import Snake from './Snake.js'
import NoContent from './content/NoContent.js'
import SquareContent from './content/SquareContent.js'

export default class Square {
  content: SquareContent
  constructor() {
    this.content = new NoContent()
  }

  public hasFood() {
    return this.content.isFood()
  }

  public setContent(content: SquareContent) {
    this.content = content
  }

  public hasContent(content: SquareContent) {
    return this.content === content
  }

  public popContent() {
    const oldContent = this.content
    this.content = new NoContent()
    return oldContent
  }

  public snakePassingThrough(snake: Snake) {
    this.content.snakePassingThrough(snake)
  }
}
