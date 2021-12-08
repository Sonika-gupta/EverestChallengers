const { errors } = require('./globals')

function strToInput (str) {
  if (!str) throw errors.invalidInput
  const input = str.split(/\s/)
  return input && input.map(item => item.toLowerCase())
}

function generateRandomIndex (length) {
  return Math.floor(Math.random() * length)
}

function printToConsole (str) {
  console.log(str)
}

module.exports = {
  generateRandomIndex,
  printToConsole,
  strToInput
}
