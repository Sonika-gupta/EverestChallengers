const bowlTypes = require('./data/bowlTypes.json')
const shotTypes = require('./data/shotTypes.json')
const BowlCard = require('./classes/BowlCard')
const { game } = require('./globals')

function populateBowlTypes () {
  bowlTypes.forEach(type => {
    const bowlCard = new BowlCard(type, shotTypes)
    game.addBowlCard(bowlCard)
  })
}

module.exports = {
  populateBowlTypes
}
