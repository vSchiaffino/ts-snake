import Square from './Square.js'

export default class Board {
  public squares: Square[][]
  constructor(width: number, height: number) {
    this.squares = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => new Square())
    )
  }

  public getSize() {
    const ROW_LENGTH = this.squares.length
    const COL_LENGTH = this.squares[0].length
    return { ROW_LENGTH, COL_LENGTH }
  }

  public hasFoodInAnySquare() {
    return this.squares.some((row) => row.some((square) => square.hasFood()))
  }
}
