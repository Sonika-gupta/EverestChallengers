const { errors } = require('./globals')

function getInputFromString (str) {
  const input = str.split(/\s/)
  console.log(input)
  if (!input || input.length !== 3) throw errors.invalidInput
  return input.map(value => value.toLowerCase())
}

module.exports = {
  getInputFromString
}
