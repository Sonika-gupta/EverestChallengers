const { predictSuperOverOutcome } = require('./predictSuperOverOutcome')
const { populateBowlCards, populateTeams } = require('./populators')
const { playSuperOver } = require('./predictSuperOverOutcome')

const shotsPlayed = [
  'Straight Perfect',
  'Flick Early',
  'Scoop Good',
  'LegGlance Good',
  'CoverDrive Late',
  'LongOn Perfect'
]

populateBowlCards()
populateTeams()
playSuperOver(shotsPlayed)
