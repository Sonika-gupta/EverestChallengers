const Game = require('./classes/Game')
const shotTimings = require('./data/shotTimings.json')

module.exports = {
  game: new Game(),
  errors: {
    invalidInput: 'Invalid Input',
    invalidBowlType: 'Invalid Bowl Type',
    invalidShotType: 'Invalid Shot Type'
  },
  hitProbs: {
    high: 0.7,
    average: 0.4
  }
}
