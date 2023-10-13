import SquareContent, { ContentKey } from './SquareContent.js'

export default class NoContent extends SquareContent {
  public key() {
    return ContentKey.no
  }
}
