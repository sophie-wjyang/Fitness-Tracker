const mongoose = require('mongoose');

//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { //field
    type: String,
    required: true,
    unique: true,
    trim: true, //trims white space off the end
    minlength: 3
  },
}, {
  timestamps: true, //data for when something is created/modified
});

const User = mongoose.model('User', userSchema);

module.exports = User;