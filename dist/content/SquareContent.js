export var ContentKey;
(function (ContentKey) {
    ContentKey[ContentKey["no"] = 0] = "no";
    ContentKey[ContentKey["food"] = 1] = "food";
    ContentKey[ContentKey["snake"] = 2] = "snake";
})(ContentKey || (ContentKey = {}));
export default class SquareContent {
    isFood() {
        return false;
    }
    snakePassingThrough(snake, game) { }
}
