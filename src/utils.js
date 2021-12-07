const { errors } = require('./globals')

function strToInput (str) {
  const input = str.split(/\s/)
  if (!input || input.length !== 3) throw errors.invalidInput
  input[2] = input[2].toLowerCase()
  return input
}

function generateRandomIndex (length) {
  return Math.floor(Math.random() * length)
}
module.exports = {
  strToInput,
  generateRandomIndex
}
