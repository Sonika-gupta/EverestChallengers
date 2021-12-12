const { startNewGame } = require('../src/models/game')
const playSuperOver = require('../src/playSuperOver')

startNewGame()
describe('Valid Super Over', () => {
  test('Should Print Commentary for each ball and result of match', () => {
    expect(() =>
      playSuperOver([
        'Straight Late',
        'Pull Early',
        'UpperCut Late',
        'Sweep Late',
        'CoverDrive Early',
        'Flick Late'
      ])
    ).not.toThrow()
  })
})
