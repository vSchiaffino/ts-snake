import Snake from '../Snake.js'

export enum ContentKey {
  no,
  food,
  snake,
}

export default abstract class SquareContent {
  public isFood() {
    return false
  }
  public abstract key(): ContentKey
  public snakePassingThrough(snake: Snake) {}
}
