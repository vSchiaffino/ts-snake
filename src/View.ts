import Square from './Square.js'
import Game from './Game.js'
import { ContentKey } from './content/SquareContent.js'

const SQUARES_OFFSET = 1
const SQUARE_SIZE = 40

export default class View {
  private game: Game
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  constructor(canvas: HTMLCanvasElement, game: Game) {
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('2d context not supported')

    this.game = game
    this.canvas = canvas
    this.ctx = ctx
  }

  public start() {
    this.setInitialCanvasSize()
    requestAnimationFrame(this.gameLoop.bind(this))
  }

  private setInitialCanvasSize() {
    const { ROW_LENGTH, COL_LENGTH } = this.game.board.getSize()
    this.canvas.width = ROW_LENGTH * SQUARE_SIZE + ROW_LENGTH * SQUARES_OFFSET
    this.canvas.height = COL_LENGTH * SQUARE_SIZE + COL_LENGTH * SQUARES_OFFSET
  }

  private gameLoop() {
    this.clearCanvas()
    this.drawSquares()
    this.game.tick()
    setTimeout(() => requestAnimationFrame(this.gameLoop.bind(this)), 500)
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private drawRect(x: number, y: number, w: number, h: number, color: string) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, w, h)
  }

  private drawCircle(
    centerX: number,
    centerY: number,
    radius: number,
    color: string
  ) {
    this.ctx.fillStyle = color
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  private drawSquares() {
    const squares = this.game.board.squares
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        const square = squares[i][j]
        this.drawSquare(i, j, 'gray')
        this.drawSquareContent(square, i, j)
      }
    }
  }

  private drawSquare(i: number, j: number, color: string) {
    this.drawRect(
      j * SQUARE_SIZE + j * SQUARES_OFFSET,
      i * SQUARE_SIZE + i * SQUARES_OFFSET,
      SQUARE_SIZE,
      SQUARE_SIZE,
      color
    )
  }

  private drawSquareContent(square: Square, i: number, j: number) {
    const contentKey = square.content.key()
    const mapKeyWithMethod = {
      [ContentKey.no]: () => {},
      [ContentKey.food]: this.drawFoodContent.bind(this),
      [ContentKey.snake]: this.drawSnakeContent.bind(this),
    }
    const method = mapKeyWithMethod[contentKey]
    method(square, i, j)
  }

  private drawFoodContent(square: Square, i: number, j: number) {
    const squareX = i * SQUARE_SIZE + i * SQUARES_OFFSET
    const squareY = j * SQUARE_SIZE + j * SQUARES_OFFSET
    const centerX = squareX + SQUARE_SIZE / 2
    const centerY = squareY + SQUARE_SIZE / 2
    this.drawCircle(centerX, centerY, SQUARE_SIZE / 4, 'red')
  }

  private drawSnakeContent(square: Square, i: number, j: number) {
    this.drawSquare(i, j, 'green')
  }
}
