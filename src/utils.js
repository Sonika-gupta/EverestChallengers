function strToInput (str) {
  const input = str.split(/\s/)
  return input && input.map(item => item.toLowerCase())
}

function generateRandomIndex (length) {
  return Math.floor(Math.random() * length)
}

module.exports = {
  strToInput,
  generateRandomIndex
}
