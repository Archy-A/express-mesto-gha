// models/card.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
  },

  owner: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },

  likes: {
    type: Array,
    // unique: true,
    default: []
  },

  likes: [{
    type: String,
  }],

  createdAt: {
    type: Date,
    default: Date.now
  },

});

module.exports = mongoose.model('card', cardSchema);