const { generateRandomIndex, strToInput } = require('../utils')
const { errors } = require('../globals')
const Team = require('./Team')

class Game {
  constructor () {
    this.bowlCards = []
    this.teams = []
    this.battingTeamIndex = null
    this.bowlingTeamIndex = null
    this.currentBowler = { index: -1 }
    this.currentBatsman = { index: -1 }
    this.secondaryBatsman = { index: -1 }
    this.wicketIndices = []
    this.target = 0
    this.score = 0
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
    } while (i === this.currentBowler.index)
    this.currentBowler = {
      ...this.teams[this.bowlingTeamIndex].players[i],
      index: i
    }
    return this.currentBowler
  }

  assignCurrentBatsmen () {
    let i
    do {
      i = generateRandomIndex(this.teams[this.battingTeamIndex].size)
    } while (i === this.currentBatsman.index && this.wicketIndices.includes(i))
    this.currentBatsman = {
      ...this.teams[this.battingTeamIndex].players[i],
      index: i
    }
    return this.currentBatsman
  }

  assignSecondaryBatsmen () {
    let i
    do {
      i = generateRandomIndex(this.teams[this.battingTeamIndex].size)
    } while (
      i === this.secondaryBatsman.index &&
      this.wicketIndices.includes(i)
    )
    this.secondaryBatsman = {
      ...this.teams[this.battingTeamIndex].players[i],
      index: i
    }
    return this.secondaryBatsman
  }

  startSuperOver (info) {
    this.updateGame(info)
    this.assignBowler()
    this.assignCurrentBatsmen()
    this.assignSecondaryBatsmen()

    return {
      bowler: this.currentBowler.name,
      batsman: this.currentBatsman.name
    }
  }

  playDelivery (outcome) {
    if (outcome.score === -1) {
      this.wicketIndices.push(this.currentBatsman.index)
      this.assignCurrentBatsmen()
      if (this.wicketIndices.length === 2) return this.getResult()
      return
    }

    if (outcome.score === 1 || outcome.score === 3) {
      const temp = this.secondaryBatsman
      this.secondaryBatsman = this.currentBatsman
      this.currentBatsman = temp
    }

    this.score += outcome.score
    if (this.score >= this.target) return this.getResult()
  }

  getResult () {
    const teamName = this.teams[this.battingTeamIndex].name.toUpperCase()
    const comment = `${teamName} scored: ${this.score} runs`
    if (this.wicketIndices.length === 2 || this.score < this.target) {
      return comment + `\n${teamName} lost by ${this.target - this.score} runs`
    }
    return (
      comment + `\n${teamName} won by ${2 - this.wicketIndices.length} wickets`
    )
  }
}

module.exports = Game
