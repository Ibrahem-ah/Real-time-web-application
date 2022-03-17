const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then((result) => {
    console.log('http://localhost:3000');
    console.log('Connected!');
  })
  .catch((err) => {
    console.log(err);
  });
