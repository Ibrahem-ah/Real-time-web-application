const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
});

const User = mongoose.model('User', userSchema); //Mongoose by default use plurals for collection name.
module.exports = User;
