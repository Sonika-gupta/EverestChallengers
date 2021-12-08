const { BowlCard, Team, Player } = require('./classes')
const { bowlTypes, shotTypes, teams } = require('./data')
const game = require('./models/game')

function populateBowlCards () {
  bowlTypes.forEach(type => {
    const bowlCard = new BowlCard({
      ...type,
      shotTypes: shotTypes.map(type => type.value)
    })
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

function populateGame () {
  populateBowlCards()
  populateTeams()
}

module.exports = populateGame
