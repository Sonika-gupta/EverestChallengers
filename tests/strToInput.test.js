const { strToInput } = require('../src/utils')

describe('Validate Input', () => {
  test('empty input should throw error', () => {
    expect(() => strToInput('')).toThrow('Invalid Input')
  })

  test('Input with less than 3 parameters should throw error', () => {
    expect(() => strToInput('Pull Perfect')).toThrow('Invalid Input')
  })
})
