const mongoose = require('mongoose');
const { emailValidation } = require('../utils/emailValidator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Александр',
  },
  email: {
    type: String,
    required: true,
    validate: emailValidation,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
