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

function printToConsole (str) {
  console.log(str)
}

module.exports = {
  generateRandomIndex,
  printToConsole,
  strToInput,
  toTitleCase
}
