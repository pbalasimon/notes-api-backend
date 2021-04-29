const User = require('../models/User')
const bcrypt = require('bcrypt')
const { app } = require('index')
const supertest = require('supertest')

const api = supertest(app)

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'miduroot', passwordHash: passwordHash })

    await user.save()
  })

  test('works as expected creating a fresh username')
})
