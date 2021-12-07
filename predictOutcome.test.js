const { game } = require('./src/globals')
const shotTimings = require('./src/data/shotTimings.json')
const shotTypes = require('./src/data/shotTypes.json')

const { populateBowlTypes } = require('./src/populators')
const { predictOutcome } = require('./src/predictOutcome')

const [highProb, averageProb] = [0.7, 0.4]

populateBowlTypes()

describe('Validate Input', () => {
  test('empty input should throw error', () => {
    expect(() => predictOutcome('')).toThrow('Invalid Input')
  })

  test('Input with less than 3 parameters should throw error', () => {
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
  const card = game.bowlCards[Math.floor(Math.random() * game.bowlCards.length)]
  const [badShot] = Object.entries(card.hitProbs).find(
    ([shot, prob]) => prob < averageProb
  )
  test('shot type with hit probability < averageProb should return 0 runs or wicket irrespective of timing', () => {
    shotTimings.forEach(timing => {
      expect(predictOutcome(`${card.name} ${badShot} ${timing}`)).toMatch(
        /0 runs|1 wicket/
      )
    })
  })
})

describe('perfect timing', () => {
  const card = game.bowlCards[Math.floor(Math.random() * game.bowlCards.length)]
  const [boundaryShot, prob] = Object.entries(card.hitProbs).find(
    ([shot, prob]) => prob >= highProb
  )
  test('shot type with hit probability >= highProb should result in 4 or 6 runs', () => {
    expect(predictOutcome(`${card.name} ${boundaryShot} Perfect`)).toMatch(
      /4 runs|6 runs/
    )
  })

  const [averageShot, prob2] = Object.entries(card.hitProbs).find(
    ([shot, prob]) => prob >= averageProb && prob < highProb
  )
  test('shot type with hit probability < highProb but >= averageProb should result in 2 or 3 runs', () => {
    expect(predictOutcome(`${card.name} ${averageShot} Perfect`)).toMatch(
      /2 runs|3 runs/
    )
  })
})

describe('good timing', () => {
  const card = game.bowlCards[Math.floor(Math.random() * game.bowlCards.length)]

  const [goodShot] = Object.entries(card.hitProbs).find(
    ([shot, prob]) => prob >= highProb
  )
  test('shot type with hit probability >= highProb should result in 3 or 4 runs', () => {
    expect(predictOutcome(`${card.name} ${goodShot} Good`)).toMatch(
      /3 runs|4 runs/
    )
  })
  const [averageShot] = Object.entries(card.hitProbs).find(
    ([shot, prob]) => prob >= averageProb && prob < highProb
  )
  test('shot type with hit probability < highProb but >= averageProb should result in 1 or 2 runs', () => {
    expect(predictOutcome(`${card.name} ${averageShot} Good`)).toMatch(
      /1 run|2 runs/
    )
  })
})

describe('early timing', () => {
  const card = game.bowlCards[Math.floor(Math.random() * game.bowlCards.length)]
  const [goodShot] = Object.entries(card.hitProbs).find(
    ([shot, prob]) => prob >= highProb
  )
  test('shot type with hit probability >= highProb should result in 1 or 2 runs', () => {
    expect(predictOutcome(`${card.name} ${goodShot} Early`)).toMatch(
      /1 run|2 runs/
    )
  })
  const [averageShot] = Object.entries(card.hitProbs).find(
    ([shot, prob]) => prob >= averageProb && prob < highProb
  )
  test('shot type with hit probability < highProb but > averageProb should result in 0 or 1 runs', () => {
    expect(predictOutcome(`${card.name} ${averageShot} Early`)).toMatch(
      /0 runs|1 run/
    )
  })
})

describe('late timing', () => {
  const card = game.bowlCards[Math.floor(Math.random() * game.bowlCards.length)]
  const shot = shotTypes[Math.floor(Math.random() * shotTypes.length)]
  test('all bowl type and shot type combinations with Late timing should result in 0 runs or 1 wicket', () => {
    expect(predictOutcome(`${card.name} ${shot} Late`)).toMatch(
      /0 runs|1 wicket/
    )
  })
})
