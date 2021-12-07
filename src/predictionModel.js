const outcomes = {
  wicket: '1 wicket',
  noRuns: '0 runs',
  oneRun: '1 run',
  twoRuns: '2 runs',
  threeRuns: '3 runs',
  fourRuns: '4 runs',
  fiveRuns: '5 runs',
  sixRuns: '6 runs'
}

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
      minProb: 0.7,
      outcomes: levelledOutcomes.boundary
    },
    {
      minProb: 0.4,
      outcomes: levelledOutcomes.betweenWickets.slice(1)
    }
  ],
  good: [
    { minProb: 0.7, outcomes: levelledOutcomes.good },
    { minProb: 0.4, outcomes: levelledOutcomes.betweenWickets.slice(0, 2) }
  ],
  early: [
    { minProb: 0.7, outcomes: levelledOutcomes.betweenWickets.slice(0, 2) },
    { minProb: 0.4, outcomes: levelledOutcomes.average }
  ],
  late: [{ minProb: 0, outcomes: levelledOutcomes.bad }],
  default: levelledOutcomes.bad[Math.floor(Math.random() * 2)]
}

module.exports = {
  predictionModel: model
}
