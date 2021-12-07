const bowlTypes = require('./data/bowlTypes.json')
const shotTypes = require('./data/shotTypes.json')
const teams = require('./data/teams.json')

const BowlCard = require('./classes/BowlCard')
const Team = require('./classes/Team')
const Player = require('./classes/Player')

const { game } = require('./game')

function populateBowlCards () {
  bowlTypes.forEach(type => {
    const bowlCard = new BowlCard(type, shotTypes)
    game.addBowlCard(bowlCard)
  })
}

function populateTeams () {
  const team1 = new Team({
    ...teams[0],
    players: teams[0].players.map(player => new Player(player))
  })
  const team2 = new Team({
    ...teams[1],
    players: teams[1].players.map(player => new Player(player))
  })
  game.addTeams(team1, team2)
}

module.exports = {
  populateBowlCards,
  populateTeams
}
