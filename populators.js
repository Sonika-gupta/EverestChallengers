const bowlTypes = require('./data/bowlTypes.json')
const BowlCard = require('./classes/BowlCard')
const { game } = require('./globals')

function populateBowlTypes () {
  Object.entries(bowlTypes).forEach(([type, data]) => {
    const bowlCard = new BowlCard({ name: type, ...data })
    game.addBowlCard(bowlCard)
  })
}
console.log(game)

module.exports = {
  populateBowlTypes
}
