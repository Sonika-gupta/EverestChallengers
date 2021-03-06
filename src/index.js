const chalk = require('chalk')
const boxen = require('boxen')

const {
  getFunctionChoice,
  getPredictionInput,
  getSuperOverInput,
  getShotPlayed
} = require('./inquiry')

const { startNewGame } = require('./models/game')
const {
  getShotOutcome,
  getCommentaryOutcome,
  getSuperOverCommentary
} = require('./wrappers')

function header () {
  const greeting = chalk.blackBright.bold('EVEREST CHALLENGERS')
  const boxenOptions = {
    padding: 3,
    margin: 1,
    borderStyle: 'doubleSingle',
    borderColor: 'red',
    backgroundColor: 'white'
  }
  console.log(boxen(greeting, boxenOptions))
}

async function main () {
  header()
  startNewGame()
  let input = {}

  do {
    input = await getFunctionChoice()

    switch (input.functionChoice) {
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
        getSuperOverCommentary(shotsPlayed, chasingTeamName, target)
        startNewGame()
        break
      }
    }
  } while (input.functionChoice !== 'Exit')
}

main()
