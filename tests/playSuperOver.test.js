const playSuperOver = require('../src/playSuperOver')
const populateGame = require('../src/populators')

populateGame()

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
