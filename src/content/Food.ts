import SquareContent, { ContentKey } from './SquareContent.js'

export default class FoodContent extends SquareContent {
  public key() {
    return ContentKey.food
  }

  public isFood(): boolean {
    return true
  }
}
