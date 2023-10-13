import { Direction } from './Snake.js'
import Game from './Game.js'
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement
const game = new Game(canvas)

window.onload = () => {
  if (canvas) {
    game.start()
  }
}

window.onkeydown = (e) => {
  // get key pressed
  const mapkeyWithDirection = {
    ArrowUp: Direction.UP,
    ArrowRight: Direction.RIGHT,
    ArrowDown: Direction.DOWN,
    ArrowLeft: Direction.LEFT,
  }
  if (e.key in mapkeyWithDirection) {
    console.log('key pressed', e.key)
    game.snake.changeDirection(
      mapkeyWithDirection[e.key as keyof typeof mapkeyWithDirection]
    )
  }
}
