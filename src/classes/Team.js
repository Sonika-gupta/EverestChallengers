const Player = require('./Player')
const { generateRandomIndex } = require('../utils')

class Team {
  constructor ({ name, size, players }) {
    this.name = name
    this.size = size
    this.players = this.addPlayers(players)
  }

  addPlayers (players) {
    if (players.length != this.size) throw `Need ${this.size} Players`
    return players.map(player =>
      player instanceof Player ? player : new Player(player)
    )
  }

  getPlayer () {
    return this.players[generateRandomIndex(this.players.length)]
  }
}

module.exports = Team
