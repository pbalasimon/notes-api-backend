const { sum } = require('../utils/operations')

test.skip('sum of 1 and 1 is 2', () => {
  const result = sum(1, 1)
  expect(result).toBe(2)
})

test.skip('sum of no params is undefined', () => {
  const result = sum()
  expect(result).toBeNaN()
})
