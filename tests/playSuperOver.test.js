const populateGame = require('../src/populators')
const playSuperOver = require('../src/playSuperOver')

populateGame()

describe('Test Super Over', () => {
  test('see if it runs', () => {
    expect(
      playSuperOver({
        shotsPlayed: [
          'Straight Perfect',
          'Pull Early',
          'UpperCut Good',
          'Sweep Late',
          'CoverDrive Early',
          'Flick Perfect'
        ]
      })
    )
  })
})
