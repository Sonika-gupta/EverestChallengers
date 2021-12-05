const { populateBowlTypes } = require('./populators')
const { predictOutcome } = require('./predictOutcome')

describe('validateInput', () => {
  test('empty input should throw error', () => {
    expect(() => predictOutcome('')).toThrow('Invalid Input')
  })
})

describe('validateInputLength', () => {
  test('input with less than 3 parameters should throw error', () => {
    expect(() => predictOutcome('Pull Perfect')).toThrow('Invalid Input')
  })
})

describe('validateBowlType', () => {
  test('Bowl type not allowed', () => {
    expect(() => predictOutcome('BB Pull Perfect')).toThrow('Invalid Bowl Type')
  })
})

describe('validateShotType', () => {
  test('Shot type not allowed', () => {
    populateBowlTypes()
    expect(() => predictOutcome('Bouncer SS Perfect')).toThrow(
      'Invalid Shot Type'
    )
  })
})
