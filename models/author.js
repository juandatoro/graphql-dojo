const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
  // Mongo DB creates an unique ID for each data we put in
})

module.exports = mongoose.model('Author', authorSchema);
