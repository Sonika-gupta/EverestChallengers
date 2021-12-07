class Game {
  constructor () {
    this.bowlCards = []
  }

  addBowlCard (card) {
    this.bowlCards.push(card)
  }

  getBowlCard (type) {
    return this.bowlCards.find(card => card.name === type)
  }
}

module.exports = Game
