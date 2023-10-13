import Board from './Board.js'
import View from './View.js'

export default class Game {
  private view: View
  public board: Board
  constructor(canvas: HTMLCanvasElement) {
    this.view = new View(canvas, this)
    this.board = new Board(20, 20)
  }

  public start() {
    this.view.start()
  }

  public tick() {
    const boardHasFood = this.board.hasFoodInAnySquare()
    if (!boardHasFood) this.spawnFood()
  }

  private spawnFood() {
    const { ROW_LENGTH, COL_LENGTH } = this.board.getSize()
    const i = this.randInt(0, ROW_LENGTH - 1)
    const j = this.randInt(0, COL_LENGTH - 1)
    console.log(`spawning food in ${i} ${j}`)
    this.board.squares[i][j].spawnFood()
  }

  private randInt(min: number, max: number): number {
    if (min > max) {
      throw new Error('min must be less than or equal to max')
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
