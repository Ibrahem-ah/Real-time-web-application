const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  room: { type: Number },
  users: [
    {
      user: { type: String },
    },
  ],
});

module.exports = mongoose.model('Room', roomSchema);
