class BowlCard {
  constructor ({ name, goodShotTypes, averageShotTypes, badShotTypes }) {
    this.name = name.toLowerCase()
    this.goodShotTypes = goodShotTypes
    this.averageShotTypes = averageShotTypes
    this.badShotTypes = badShotTypes
  }
  getShotLevel (shotType) {
    if (this.goodShotTypes.includes(shotType)) return 'good'
    if (this.averageShotTypes.includes(shotType)) return 'average'
    if (this.badShotTypes.includes(shotType)) return 'bad'
    return null
  }
}

module.exports = BowlCard
