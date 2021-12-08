const chalk = require('chalk')
const boxen = require('boxen')

const {
  getFunctionChoice,
  getPredictionInput,
  getSuperOverInput,
  getShotPlayed
} = require('./inquiry')
const populateGame = require('./populators')
const { printToConsole } = require('./utils')
const { getShotOutcome, getCommentaryOutcome } = require('./wrappers')
const playSuperOver = require('./playSuperOver')
const game = require('./models/game')

async function main () {
  const greeting = chalk.blackBright.bold('EVEREST CHALLENGERS')
  const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: 'doubleSingle',
    borderColor: 'red',
    backgroundColor: 'white'
  }
  printToConsole(boxen(greeting, boxenOptions))

  populateGame()
  console.log('game:', game)

  do {
    var { functionChoice } = await getFunctionChoice()

    switch (functionChoice) {
      case 'Predict Outcome': {
        const input = await getPredictionInput()
        getShotOutcome(Object.values(input).join(' '))
        break
      }
      case 'Get Commentary With Outcome': {
        const input = await getPredictionInput()
        getCommentaryOutcome(Object.values(input).join(' '))
        break
      }
      case 'Play Super Over': {
        const { chasingTeamName, target } = await getSuperOverInput()
        const shotsPlayed = []
        while (shotsPlayed.length != 6) {
          const { shotType, shotTiming } = await getShotPlayed(
            shotsPlayed.length + 1
          )
          shotsPlayed.push([shotType, shotTiming])
        }
        playSuperOver({ chasingTeamName, target, shotsPlayed })
        break
      }
    }
  } while (functionChoice !== 'Exit')
}

main()
