require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()
const userExtractor = require('./middleware/userExtractor')

const Note = require('./models/Note')
const loginRouter = require('./controllers/login')

const usersRouter = require('./controllers/users')

app.use(cors())
app.use(express.json())

app.get('/api/notes', userExtractor, (request, response) => {
  Note.find({}).then(notes => response.json(notes))
})

app.get('/api/notes/:id', (userExtractor, request, response, next) => {
  const id = request.params.id

  Note.findById(id).then(note => {
    if (note) {
      return response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})

app.delete('/api/notes/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    }).catch(error => next(error))
})

app.put('/api/notes/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => response.json(result))
})

app.post('/api/notes', userExtractor, (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({ error: 'required "content" field is missing' })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  })

  newNote.save().then(note => {
    response.status(201).json(note)
  })
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use((request, response, next) => {
  response.status(404).end()
})

app.use((error, request, response, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'id used is malformed' })
  } else {
    response.status(500).end()
  }
})

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
