import Square from './Square.js';
export default class Board {
    constructor(width, height) {
        this.squares = Array.from({ length: height }, () => Array.from({ length: width }, () => new Square()));
    }
    getSize() {
        const ROW_LENGTH = this.squares.length;
        const COL_LENGTH = this.squares[0].length;
        return { ROW_LENGTH, COL_LENGTH };
    }
    hasFoodInAnySquare() {
        return this.squares.some((row) => row.some((square) => square.hasFood()));
    }
    whereIs(content) {
        const rowIndex = this.squares.findIndex((row) => row.some((square) => square.hasContent(content)));
        const colIndex = rowIndex == -1
            ? -1
            : this.squares[rowIndex].findIndex((square) => square.hasContent(content));
        return [rowIndex, colIndex];
    }
    getSquareWhereIs(content) {
        const [rowIndex, colIndex] = this.whereIs(content);
        return rowIndex == -1 || colIndex == -1
            ? null
            : this.squares[rowIndex][colIndex];
    }
    getSquareApplyingMovement(square, movement) {
        const rowIndex = this.squares.findIndex((row) => row.some((s) => s === square));
        const colIndex = this.squares[rowIndex].findIndex((s) => s === square);
        if (rowIndex == -1 || colIndex == -1)
            return null;
        const [rowMovement, colMovement] = movement;
        const newRow = rowIndex + rowMovement;
        const newCol = colIndex + colMovement;
        return this.squares[newRow] && this.squares[newRow][newCol];
    }
    getSquareIn(pos) {
        const row = this.squares[pos[0]];
        const square = row && row[pos[1]];
        return square;
    }
}
