import SquareContent, { ContentKey } from './SquareContent.js';
export default class NoContent extends SquareContent {
    key() {
        return ContentKey.no;
    }
}
