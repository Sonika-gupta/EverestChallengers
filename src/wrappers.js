const { getOutcome } = require('./predictOutcome')
const { generateRandomIndex, strToInput } = require('./utils')

const inquiry = require('./inquiry')

function getComment (outcome) {
  return (
    outcome.comments[generateRandomIndex(outcome.comments.length)] +
    ' - ' +
    outcome.result
  )
}

async function getShotOutcome () {
  const str = await inquiry.getPredictionInput()
  const outcome = getOutcome(str)
  return outcome.result
}

async function getCommentaryOutcome () {
  const str = await inquiry.getPredictionInput()
  const outcome = getOutcome(str)
  return getComment(outcome)
}

module.exports = {
  getComment,
  getShotOutcome,
  getCommentaryOutcome
}
