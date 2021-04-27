const mongoose = require('mongoose')
const connectionURL = process.env.MONGO_DB_URI

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Database connected!')
}).catch(error => {
  console.error(error)
})
