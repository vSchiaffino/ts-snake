import NoContent from './content/NoContent.js'
import FoodContent from './content/FoodContent.js'
import SquareContent from './content/SquareContent.js'

export default class Square {
  content: SquareContent
  constructor() {
    this.content = new NoContent()
  }

  public hasFood() {
    return this.content.isFood()
  }

  public spawnFood() {
    this.content = new FoodContent()
  }
}
