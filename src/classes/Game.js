const { generateRandomIndex, strToInput } = require('../utils')
const { errors } = require('../globals')
const Team = require('./Team')

class Game {
  constructor () {
    this.bowlCards = []
    this.teams = []
    this.battingTeamIndex = null
    this.bowlingTeamIndex = null
    this.currentBowlerIndex = null
    this.currentBatsmanIndex = null
    this.secondaryBatsmanIndex = null
    this.wicketsIndices = []
    this.target = 0
  }

  addBowlCard (card) {
    this.bowlCards.push(card)
  }

  getBowlCard (type) {
    return this.bowlCards.find(card => card.name === type)
  }

  addTeams (team1, team2) {
    if (this.teams.length != 0) {
      throw errors.teamAlreadyAssigned
    }

    if (!(team1 instanceof Team && team2 instanceof Team))
      throw errors.unmatchedTypeTeam

    this.teams.push(team1, team2)
  }

  updateGame ({ target, battingTeamName, bowlingTeamName }) {
    if (target) this.target = target
    if (battingTeamName) {
      this.battingTeamIndex = this.teams.findIndex(
        team => team.name === battingTeamName
      )
    }
    if (bowlingTeamName) {
      this.bowlingTeamIndex = this.teams.findIndex(
        team => team.name === bowlingTeamName
      )
    }
  }

  getRandomBowlCards (count) {
    const cards = []
    while (cards.length < count) {
      cards.push(this.bowlCards[generateRandomIndex(this.bowlCards.length)])
    }
    return cards
  }

  assignBowler () {
    let i
    do {
      i = generateRandomIndex(this.teams[this.bowlingTeamIndex].size)
    } while (i === this.currentBowlerIndex)
    this.currentBowlerIndex = i
  }

  assignCurrentBatsmen () {
    let i
    do {
      i = generateRandomIndex(this.teams[this.battingTeamIndex].size)
    } while (i === this.currentBatsmanIndex && this.wicketsIndices.includes(i))
    this.currentBatsmanIndex = i
  }

  assignSecondaryBatsmen () {
    let i
    do {
      i = generateRandomIndex(this.teams[this.battingTeamIndex].size)
    } while (
      i === this.secondaryBatsmanIndex &&
      this.wicketsIndices.includes(i)
    )
    this.secondaryBatsman = i
  }

  playDelivery (outcome) {
    if (outcome.score === -1) {
      this.currentBatsman = this.assignBatsmen()
      return this.summary()
    }

    if (outcome.score === 1 || outcome.score === 3) {
      const temp = this.secondaryBatsman
      this.secondaryBatsman = this.currentBatsman
      this.currentBatsman = temp
    }

    this.target -= outcome.score
    if (this.target <= 0) return this.summary()
    return
  }

  summary () {
    return 'Match Over'
  }
}

module.exports = Game
