const Game = require('../classes/Game')
const { populateGame } = require('../populators')

const game = new Game()

function startNewGame () {
  Object.assign(game, new Game())
  populateGame(game)
}

module.exports = {
  game,
  startNewGame
}
