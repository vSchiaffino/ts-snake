import SnakeBody from './content/SnakeBody.js'
import Board from './Board.js'
import Square from 'Square.js'
import FoodContent from 'content/Food.js'

export enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

const mapDirectionWithModifier: { [key in Direction]: [number, number] } = {
  [Direction.UP]: [-1, 0],
  [Direction.RIGHT]: [0, 1],
  [Direction.DOWN]: [1, 0],
  [Direction.LEFT]: [0, -1],
}

export default class Snake {
  private direction: Direction | null = null
  private body: SnakeBody[]

  constructor(firstBody: SnakeBody, board: Board) {
    const secondBody = new SnakeBody()
    const thirdBody = new SnakeBody()
    const firstBodyPos = board.whereIs(firstBody)
    const secondBodySquare = board.getSquareIn([
      firstBodyPos[0] + 1,
      firstBodyPos[1],
    ])
    secondBodySquare.setContent(secondBody)
    const thirdBodySquare = board.getSquareIn([
      firstBodyPos[0] + 2,
      firstBodyPos[1],
    ])
    thirdBodySquare.setContent(thirdBody)
    this.body = [firstBody, secondBody, thirdBody]
  }

  public tick(board: Board) {
    if (this.direction === null) return
    const posModifier = mapDirectionWithModifier[this.direction]

    let lastMovedSquare = null
    for (const part of this.body) {
      const oldBodySquare = board.getSquareWhereIs(part)
      const newBodySquare = lastMovedSquare
        ? lastMovedSquare
        : board.getSquareApplyingMovement(oldBodySquare, posModifier)

      if (!oldBodySquare) {
        lastMovedSquare?.setContent(part)
        return
      }

      if (!newBodySquare) {
        return
      }

      newBodySquare.snakePassingThrough(this)
      newBodySquare.setContent(oldBodySquare.popContent())
      lastMovedSquare = oldBodySquare
    }
  }

  public eat() {
    console.log('eat')
    this.body.push(new SnakeBody())
  }

  public changeDirection(direction: Direction) {
    this.direction = direction
  }
}
