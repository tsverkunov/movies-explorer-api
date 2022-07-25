const express = require('express')
const mongoose = require('mongoose')

const {PORT = 3000} = process.env

mongoose.connect('mongodb://localhost:27017/mestodb')
  // eslint-disable-next-line no-console
  .then(() => console.log(`mongoose connected`))
  // eslint-disable-next-line no-console
  .catch((e) => console.log(e))


const app = express()

app.listen(PORT, ()=> console.log(`App listening on port ${PORT}`))
