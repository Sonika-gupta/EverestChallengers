const { hitProbs } = require('../globals')
const outcomes = require('../data/outcomes.json')

const levelledOutcomes = {
  bad: [outcomes.wicket, outcomes.noRuns],
  average: [outcomes.noRuns, outcomes.oneRun],
  betweenWickets: [outcomes.oneRun, outcomes.twoRuns, outcomes.threeRuns],
  good: [outcomes.threeRuns, outcomes.fourRuns],
  boundary: [outcomes.fourRuns, outcomes.sixRuns]
}

const model = {
  perfect: [
    {
      minProb: hitProbs.high,
      outcomes: levelledOutcomes.boundary
    },
    {
      minProb: hitProbs.average,
      outcomes: levelledOutcomes.betweenWickets.slice(1)
    }
  ],
  good: [
    { minProb: hitProbs.high, outcomes: levelledOutcomes.good },
    {
      minProb: hitProbs.average,
      outcomes: levelledOutcomes.betweenWickets.slice(0, 2)
    }
  ],
  early: [
    {
      minProb: hitProbs.high,
      outcomes: levelledOutcomes.betweenWickets.slice(0, 2)
    },
    { minProb: hitProbs.average, outcomes: levelledOutcomes.average }
  ],
  late: [{ minProb: 0, outcomes: levelledOutcomes.bad }],
  default: levelledOutcomes.bad
}

module.exports = {
  predictionModel: model
}
