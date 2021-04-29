const mongoose = require('mongoose')
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionURL = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI
console.log(connectionURL)
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoCreate: true
}).then(() => {
  console.log('Database connected!')
}).catch(error => {
  console.error(error)
})
