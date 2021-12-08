class BowlCard {
  constructor ({ name, type, shotTypes }) {
    this.name = name
    this.type = type
    this.hitProbs = this.assignProbs(shotTypes)
  }
  getHitProbability (shotType) {
    return this.hitProbs[shotType] || null
  }
  assignProbs (shotTypes) {
    const probObj = {}
    shotTypes.forEach(type => {
      probObj[type] = Math.random().toFixed(2)
    })
    return probObj
  }
}

module.exports = BowlCard
