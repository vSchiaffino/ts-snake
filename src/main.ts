import Game from './Game.js'

window.onload = () => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement
  if (canvas) {
    const game = new Game(canvas)
    game.start()
  }
}
