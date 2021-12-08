const { populateBowlCards } = require('../src/populators')
const { getShotOutcome, getCommentaryOutcome } = require('../src/wrappers')

populateBowlCards()

describe('Validate Input', () => {
  test('empty input should throw error', () => {
    expect(() => getShotOutcome('')).toThrow('Invalid Input')
    expect(() => getCommentaryOutcome('')).toThrow('Invalid Input')
  })

  test('Input with less than 3 parameters should throw error', () => {
    expect(() => getShotOutcome('Pull Perfect')).toThrow('Invalid Input')
    expect(() => getCommentaryOutcome('Pull Perfect')).toThrow('Invalid Input')
  })

  test('Bowl type not allowed', () => {
    expect(() => getShotOutcome('BB Pull Perfect')).toThrow('Invalid Bowl Type')
    expect(() => getCommentaryOutcome('BB Pull Perfect')).toThrow(
      'Invalid Bowl Type'
    )
  })

  test('Shot type not allowed', () => {
    expect(() => getShotOutcome('Bouncer SS Perfect')).toThrow(
      'Invalid Shot Type'
    )
    expect(() => getCommentaryOutcome('Bouncer SS Perfect')).toThrow(
      'Invalid Shot Type'
    )
  })
})
