import SnakeBody from './content/SnakeBody.js';
export var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["LEFT"] = 3] = "LEFT";
})(Direction || (Direction = {}));
const mapDirectionWithModifier = {
    [Direction.UP]: [-1, 0],
    [Direction.RIGHT]: [0, 1],
    [Direction.DOWN]: [1, 0],
    [Direction.LEFT]: [0, -1],
};
export default class Snake {
    constructor(firstBody, board) {
        this.direction = null;
        const secondBody = new SnakeBody();
        const thirdBody = new SnakeBody();
        const firstBodyPos = board.whereIs(firstBody);
        const secondBodySquare = board.getSquareIn([
            firstBodyPos[0] + 1,
            firstBodyPos[1],
        ]);
        secondBodySquare.setContent(secondBody);
        const thirdBodySquare = board.getSquareIn([
            firstBodyPos[0] + 2,
            firstBodyPos[1],
        ]);
        thirdBodySquare.setContent(thirdBody);
        this.body = [firstBody, secondBody, thirdBody];
    }
    tick(game) {
        const board = game.board;
        if (this.direction === null)
            return;
        const posModifier = mapDirectionWithModifier[this.direction];
        let lastMovedSquare = null;
        for (const part of this.body) {
            const oldBodySquare = board.getSquareWhereIs(part);
            const newBodySquare = lastMovedSquare
                ? lastMovedSquare
                : board.getSquareApplyingMovement(oldBodySquare, posModifier);
            if (!oldBodySquare) {
                lastMovedSquare === null || lastMovedSquare === void 0 ? void 0 : lastMovedSquare.setContent(part);
                return;
            }
            if (!newBodySquare) {
                game.lose();
                return;
            }
            newBodySquare.snakePassingThrough(this, game);
            newBodySquare.setContent(oldBodySquare.popContent());
            lastMovedSquare = oldBodySquare;
        }
    }
    eat() {
        console.log('eat');
        this.body.push(new SnakeBody());
    }
    changeDirection(direction) {
        this.direction = direction;
    }
}
