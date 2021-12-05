class Game {
  constructor (id) {
    this.id = id
    this.bowlCards = []
  }

  addBowlCard (card) {
    this.bowlCards.push(card)
  }

  getBowlCard (type) {
    // console.log(this.bowlCards)
    return this.bowlCards.find(card => card.name === type)
  }
}

module.exports = Game
