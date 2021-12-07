const bowlTypes = require('./data/bowlTypes.json')
const BowlCard = require('./classes/BowlCard')
const { game } = require('./globals')

function populateBowlTypes () {
  bowlTypes.forEach(type => {
    const bowlCard = new BowlCard(type)
    game.addBowlCard(bowlCard)
  })
}

module.exports = {
  populateBowlTypes
}
