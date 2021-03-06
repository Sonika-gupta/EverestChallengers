const { startNewGame } = require('../src/models/game')
const { getOutcome } = require('../src/predictOutcome')

startNewGame()
describe('Validate Input', () => {
  test('empty input should throw error', () => {
    expect(() => getOutcome('')).toThrow('Invalid Input')
  })

  test('Input with less than 3 parameters should throw error', () => {
    expect(() => getOutcome('Pull Perfect')).toThrow('Invalid Input')
  })

  test('Bowl type not allowed', () => {
    expect(() => getOutcome('BB Pull Perfect')).toThrow('Invalid Bowl Type')
  })

  test('Shot type not allowed', () => {
    expect(() => getOutcome('Bouncer SS Perfect')).toThrow('Invalid Shot Type')
  })
})
