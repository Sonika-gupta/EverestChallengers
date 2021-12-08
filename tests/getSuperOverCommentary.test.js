const { getSuperOverCommentary } = require('../src/wrappers')
const { errors } = require('../src/globals')
const populateGame = require('../src/populators')

populateGame()

describe('Invalid Super Over', () => {
  test('Shots Played array need 6 entries', () => {
    expect(() =>
      getSuperOverCommentary({
        shotsPlayed: [
          'Straight Perfect',
          'Pull Early',
          'UpperCut Good',
          'Sweep Late',
          'CoverDrive Early'
        ]
      })
    ).toThrow(errors.requiredSixEntries)
  })

  test('Each shot entry should have shot timing', () => {
    expect(() =>
      getSuperOverCommentary({
        shotsPlayed: [
          'Straight Late',
          'Pull Early',
          'UpperCut',
          'Sweep Late',
          'CoverDrive Early',
          'Flick Perfect'
        ]
      })
    ).toThrow(errors.invalidShotTiming)
  })

  test('Each shot entry should have Shot type', () => {
    expect(() =>
      getSuperOverCommentary({
        shotsPlayed: [
          'Straight Perfect',
          'Pull Early',
          'UpperCut Good',
          'Late',
          'CoverDrive Early',
          'Flick Perfect'
        ]
      })
    ).toThrow(errors.invalidShotType)
  })
})
