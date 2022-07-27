require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const  {errors} = require('celebrate')

const {PORT = 3000} = process.env

const app = express()

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb')
  // eslint-disable-next-line no-console
  .then(() => console.log(`mongoose connected`))
  // eslint-disable-next-line no-console
  .catch((e) => console.log(e))

app.use('/signup', require('./routes/signup'));

app.use(errors())

app.listen(PORT, ()=> console.log(`App listening on port ${PORT}`))
