import SnakeBody from './content/SnakeBody.js'
import Board from './Board.js'
import Game from './Game.js'

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

  public tick(game: Game) {
    const board = game.board
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
        game.lose()
        return
      }

      newBodySquare.snakePassingThrough(this, game)
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
