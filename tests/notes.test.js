const supertest = require('supertest')
const { app, server } = require('../index')
const mongoose = require('mongoose')
const Note = require('../models/Note')
const api = supertest(app)
const { initialNotes } = require('./helper')

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  const note2 = new Note(initialNotes[1])
  await note1.save()
  await note2.save()
})

test('notes are returned as json', async () => {
  await api.get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about midudev', async () => {
  const response = await api.get('/api/notes')
  expect(response.body[0].content).toBe('Aprendiendo FullStack JS con midudev')
})

test('add a valid note', async () => {
  const note = {
    content: 'Proximamente async/await',
    important: true
  }
  await api
    .post('/api/notes')
    .send(note)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/notes')

  const contents = response.body.map(note => note.content)
  expect(contents).toContain(note.content)
})

test('add a invalid note', async () => {
  const note = {
    important: true
  }
  await api
    .post('/api/notes')
    .send(note)
    .expect(400)

  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
