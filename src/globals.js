const chalk = require('chalk')

module.exports = {
  errors: {
    invalidInput: 'Invalid Input',
    invalidBowlType: 'Invalid Bowl Type',
    invalidShotType: 'Invalid Shot Type',
    invalidShotTiming: 'Invalid Shot Timing',
    unmatchedTypeTeam: 'Team Type Not Matched',
    teamAlreadyAssigned: 'Teams Already Assigned',
    requiredSixEntries: 'Need Six Shots for an Over'
  },
  hitProbs: {
    high: 0.7,
    average: 0.4
  },
  colorText: {
    comment: chalk.magenta,
    resultGood: chalk.green,
    resultAverage: chalk.cyan,
    resultBad: chalk.red,
    australia: chalk.yellow,
    india: chalk.blue,
    score: chalk.bold.whiteBright
  }
}
