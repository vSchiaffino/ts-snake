import SquareContent from 'content/SquareContent.js'
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

  public whereIs(content: SquareContent): [number, number] {
    const rowIndex = this.squares.findIndex((row) =>
      row.some((square) => square.hasContent(content))
    )
    const colIndex = this.squares[rowIndex].findIndex((square) =>
      square.hasContent(content)
    )
    return [rowIndex, colIndex]
  }

  public getSquareIn(pos: [number, number]) {
    const row = this.squares[pos[0]]
    const square = row && row[pos[1]]
    return square
  }
}
