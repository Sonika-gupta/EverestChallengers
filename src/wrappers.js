const playSuperOver = require('./playSuperOver')
const { getOutcome } = require('./predictOutcome')
const {
  generateRandomIndex,
  strToInput,
  printToConsole,
  decorate,
  getComment
} = require('./utils')

function getShotOutcome (str) {
  const outcome = getOutcome(str)
  printToConsole(decorate(outcome.result, 'result'))
}

function getCommentaryOutcome (str) {
  const outcome = getOutcome(str)
  printToConsole(getComment(outcome))
}

function getSuperOverCommentary (shotsPlayed, chasingTeamName, target) {
  const commentary = playSuperOver(shotsPlayed, chasingTeamName, target)
  commentary.forEach(comment => printToConsole(comment))
}

module.exports = {
  getShotOutcome,
  getCommentaryOutcome,
  getSuperOverCommentary
}
