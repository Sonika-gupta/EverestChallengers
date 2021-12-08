const { shotTimings, shotTypes, outcomes } = require('../src/data')

const game = require('../src/models/game')
const populateGame = require('../src/populators')
const { predictOutcome } = require('../src/predictOutcome')
const { generateRandomIndex } = require('../src/utils')

const [highProb, averageProb] = [0.7, 0.4]

populateGame()

describe('bad outcome', () => {
  test('shot type with hit probability < averageProb should return 0 runs or wicket irrespective of timing', () => {
    const card = game.bowlCards[generateRandomIndex(game.bowlCards.length)]
    const [badShot] = Object.entries(card.hitProbs).find(
      ([shot, prob]) => prob < averageProb
    )
    const timing = shotTimings[generateRandomIndex(shotTimings.length)].value

    expect([outcomes.wicket, outcomes.noRuns]).toContain(
      predictOutcome(card, badShot, timing)
    )
  })
})

describe('perfect timing', () => {
  const card = game.bowlCards[generateRandomIndex(game.bowlCards.length)]

  test('shot type with hit probability >= highProb should result in 4 or 6 runs', () => {
    const [boundaryShot, prob] = Object.entries(card.hitProbs).find(
      ([shot, prob]) => prob >= highProb
    )

    expect([outcomes.fourRuns, outcomes.sixRuns]).toContain(
      predictOutcome(card, boundaryShot, 'perfect')
    )
  })

  test('shot type with hit probability < highProb but >= averageProb should result in 2 or 3 runs', () => {
    const [averageShot, prob2] = Object.entries(card.hitProbs).find(
      ([shot, prob]) => prob >= averageProb && prob < highProb
    )

    expect([outcomes.twoRuns, outcomes.threeRuns]).toContain(
      predictOutcome(card, averageShot, 'perfect')
    )
  })
})

describe('good timing', () => {
  const card = game.bowlCards[generateRandomIndex(game.bowlCards.length)]

  test('shot type with hit probability >= highProb should result in 3 or 4 runs', () => {
    const [goodShot] = Object.entries(card.hitProbs).find(
      ([shot, prob]) => prob >= highProb
    )

    expect([outcomes.threeRuns, outcomes.fourRuns]).toContain(
      predictOutcome(card, goodShot, 'good')
    )
  })

  test('shot type with hit probability < highProb but >= averageProb should result in 1 or 2 runs', () => {
    const [averageShot] = Object.entries(card.hitProbs).find(
      ([shot, prob]) => prob >= averageProb && prob < highProb
    )

    expect([outcomes.oneRun, outcomes.twoRuns]).toContain(
      predictOutcome(card, averageShot, 'good')
    )
  })
})

describe('early timing', () => {
  const card = game.bowlCards[generateRandomIndex(game.bowlCards.length)]

  test('shot type with hit probability >= highProb should result in 1 or 2 runs', () => {
    const [goodShot] = Object.entries(card.hitProbs).find(
      ([shot, prob]) => prob >= highProb
    )

    expect([outcomes.oneRun, outcomes.twoRuns]).toContain(
      predictOutcome(card, goodShot, 'early')
    )
  })

  test('shot type with hit probability < highProb but > averageProb should result in 0 or 1 runs', () => {
    const [averageShot] = Object.entries(card.hitProbs).find(
      ([shot, prob]) => prob >= averageProb && prob < highProb
    )

    expect([outcomes.noRuns, outcomes.oneRun]).toContain(
      predictOutcome(card, averageShot, 'early')
    )
  })
})

describe('late timing', () => {
  test('all bowl type and shot type combinations with Late timing should result in 0 runs or 1 wicket', () => {
    const card = game.bowlCards[generateRandomIndex(game.bowlCards.length)]
    const shot = shotTypes[generateRandomIndex(shotTypes.length)].value

    expect([outcomes.noRuns, outcomes.wicket]).toContain(
      predictOutcome(card, shot, 'late')
    )
  })
})
