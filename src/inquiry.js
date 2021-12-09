const inquirer = require('inquirer')

const { bowlTypes, shotTypes, shotTimings, teams } = require('./data')

function getFunctionChoice () {
  const questions = [
    {
      type: 'list',
      name: 'functionChoice',
      message: 'Welcome to CricSummit 2021. What would you like to do?',
      choices: [
        'Predict Outcome',
        'Get Commentary With Outcome',
        'Play Super Over',
        'Exit'
      ],
      default: 'Predict Outcome'
    }
  ]
  return inquirer.prompt(questions)
}

function getPredictionInput () {
  const questions = [
    {
      type: 'rawlist',
      name: 'bowlType',
      message: 'Select Bowl Type Card',
      choices: bowlTypes,
      default: bowlTypes[0]
    },
    {
      type: 'rawlist',
      name: 'shotType',
      message: 'Select Shot Type Card',
      choices: shotTypes,
      default: shotTypes[0]
    },
    {
      type: 'rawlist',
      name: 'shotTiming',
      message: 'Select Shot Timing',
      choices: shotTimings,
      default: shotTimings[0]
    }
  ]
  return inquirer.prompt(questions)
}

function getSuperOverInput () {
  const questions = [
    {
      type: 'rawlist',
      name: 'chasingTeamName',
      message: 'Which team is chasing?',
      choices: teams.map(team => ({
        name: team.name.toUpperCase(),
        value: team.name
      })),
      default: teams[1].name
    },
    {
      type: 'input',
      name: 'target',
      message: 'Enter the Target Score: ',
      validate: function (value) {
        if (value && !isNaN(Number(value))) return true
        else return 'Required a numerical target score, received' + typeof value
      }
    }
  ]
  return inquirer.prompt(questions)
}

function getShotPlayed (ballNumber) {
  const questions = [
    {
      type: 'rawlist',
      name: 'shotType',
      message: `Ball ${ballNumber}: Shot Type`,
      choices: shotTypes,
      default: shotTypes[0]
    },
    {
      type: 'rawlist',
      name: 'shotTiming',
      message: `Ball ${ballNumber}: Shot Timing`,
      choices: shotTimings,
      default: shotTimings[0]
    }
  ]
  return inquirer.prompt(questions)
}
module.exports = {
  getFunctionChoice,
  getPredictionInput,
  getSuperOverInput,
  getShotPlayed
}
