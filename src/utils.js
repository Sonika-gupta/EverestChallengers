function strToInput (str) {
  const input = str.split(/\s/)
  return input && input.map(item => item.toLowerCase())
}

function generateRandomIndex (length) {
  return Math.floor(Math.random() * length)
}

function toTitleCase (str) {
  return str[0].toUpperCase() + str.slice(1)
}

module.exports = {
  strToInput,
  generateRandomIndex,
  toTitleCase
}
