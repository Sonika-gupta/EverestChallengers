const shotTypes = require('../data/shotTypes.json')
class BowlCard {
  constructor (name) {
    this.name = name
    this.hitProbs = this.assignProbs()
  }
  getHitProbability (shotType) {
    return this.hitProbs[shotType] || null
  }
  assignProbs () {
    const probObj = {}
    shotTypes.forEach(type => {
      probObj[type] = Math.random().toFixed(2)
    })
    return probObj
  }
}

module.exports = BowlCard
