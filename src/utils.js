const { errors } = require('./globals')
const boxen = require('boxen')

function strToInput (str) {
  if (!str) throw errors.invalidInput
  const input = str.split(/\s/)
  return input && input.map(item => item.toLowerCase())
}

function generateRandomIndex (length) {
  return Math.floor(Math.random() * length)
}

function printToConsole (str) {
  const options = {
    padding: 1,
    margin: 1
  }
  console.log(boxen(str, options))
}

module.exports = {
  generateRandomIndex,
  printToConsole,
  strToInput
}
