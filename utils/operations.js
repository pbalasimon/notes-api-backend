const sum = (a, b) => a + b

const average = array => {
  let sum = 0
  sum.forEach(num => { sum += num })
  return sum / array.length
}

module.exports = {
  sum,
  average
}
