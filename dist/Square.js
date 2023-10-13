import NoContent from './content/NoContent.js';
export default class Square {
    constructor() {
        this.content = new NoContent();
    }
    hasFood() {
        return this.content.isFood();
    }
    setContent(content) {
        this.content = content;
    }
    hasContent(content) {
        return this.content === content;
    }
    popContent() {
        const oldContent = this.content;
        this.content = new NoContent();
        return oldContent;
    }
    snakePassingThrough(snake, game) {
        this.content.snakePassingThrough(snake, game);
    }
}
