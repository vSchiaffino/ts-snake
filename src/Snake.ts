import SnakeBody from './content/SnakeBody.js'
import Board from './Board.js'

export enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

const mapDirectionWithModifier = {
  [Direction.UP]: [-1, 0],
  [Direction.RIGHT]: [0, 1],
  [Direction.DOWN]: [1, 0],
  [Direction.LEFT]: [0, -1],
}

export default class Snake {
  private direction: Direction | null = null
  private body: SnakeBody[]

  constructor(firstBody: SnakeBody) {
    this.body = [firstBody]
  }

  public tick(board: Board) {
    if (this.direction === null) return

    const oldBodyPos = board.whereIs(this.body[0])
    const posModifier = mapDirectionWithModifier[this.direction]
    const newBodyPos: [number, number] = [
      oldBodyPos[0] + posModifier[0],
      oldBodyPos[1] + posModifier[1],
    ]

    const oldBodySquare = board.getSquareIn(oldBodyPos)
    const newBodySquare = board.getSquareIn(newBodyPos)

    if (!newBodySquare) {
      console.log('out of bound')
      return
    }

    newBodySquare.setContent(oldBodySquare.popContent())
  }

  public changeDirection(direction: Direction) {
    console.log('set direction', direction)
    this.direction = direction
  }
}
