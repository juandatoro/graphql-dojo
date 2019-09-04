const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
  // Mongo DB creates an unique ID for each data we put in
})

module.exports = mongoose.model('Book', bookSchema);