const { errors } = require('./globals')

function getInputFromString (str) {
  const input = str.split(/\s/)
  console.log(input)
  if (!input || input.length !== 3) throw errors.invalidInput
  input[2] = input[2].toLowerCase()
  return input
}

module.exports = {
  getInputFromString
}
