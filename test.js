const { game } = require('./globals')
const { populateBowlTypes } = require('./populators')
const { predictOutcome } = require('./predictOutcome')
const shotTimings = require('./data/shotTimings.json')

populateBowlTypes()

describe('validateInput', () => {
  test('empty input should throw error', () => {
    expect(() => predictOutcome('')).toThrow('Invalid Input')
  })

  test('input with less than 3 parameters should throw error', () => {
    expect(() => predictOutcome('Pull Perfect')).toThrow('Invalid Input')
  })

  test('Bowl type not allowed', () => {
    expect(() => predictOutcome('BB Pull Perfect')).toThrow('Invalid Bowl Type')
  })

  test('Shot type not allowed', () => {
    expect(() => predictOutcome('Bouncer SS Perfect')).toThrow(
      'Invalid Shot Type'
    )
  })
})

describe('bad outcome', () => {
  const bowlType = 'Bouncer'
  const bouncerCard = game.bowlCards.find(card => card.name === bowlType)
  const [badShot] = Object.entries(bouncerCard.hitProbs).find(
    ([shot, prob]) => prob < 0.4
  )
  console.log(badShot)
  test('shot type with hit probability < 0.4 should return 0 runs or wicket irrespective of timing', () => {
    shotTimings.forEach(timing => {
      expect(predictOutcome(`${bowlType} ${badShot} ${timing}`)).toMatch(
        /0 runs|1 wicket/
      )
    })
  })
})

describe('perfect timing', () => {
  const bowlType = 'Bouncer'
  const bouncerCard = game.bowlCards.find(card => card.name === bowlType)
  const [boundaryShot] = Object.entries(bouncerCard.hitProbs).find(
    ([shot, prob]) => prob >= 0.75
  )
  test('shot type with hit probability >= 0.75 should result in 4 or 6 runs', () => {
    expect(predictOutcome(`${bowlType} ${boundaryShot} Perfect`)).toMatch(
      /4 runs|6 runs/
    )
  })
  const [averageShot] = Object.entries(bouncerCard.hitProbs).find(
    ([shot, prob]) => prob >= 0.4 && prob < 0.75
  )
  test('shot type with hit probability > 0.75 should result in 2 or 3 runs', () => {
    expect(predictOutcome(`${bowlType} ${averageShot} Perfect`)).toMatch(
      /2 runs|3 runs/
    )
  })
})
