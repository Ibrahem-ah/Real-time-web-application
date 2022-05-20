const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },

  avatar: {
    type: String,
  },
  tokens: [
    {
      token: { type: String },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'thisisibrahimproject');

  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  return token;

  // const token = jwt.sign({ _id: user._id.toString() }, 'thisisibrahimproject', {
  //   expiresIn: '120s',
  // });
};

module.exports = mongoose.model('User', userSchema); //Mongoose by default use plurals for collection name.
