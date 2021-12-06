const Game = require('./classes/Game')

module.exports = {
  game: new Game(),
  errors: {
    invalidInput: 'Invalid Input',
    invalidBowlType: 'Invalid Bowl Type',
    invalidShotType: 'Invalid Shot Type'
  }
}
