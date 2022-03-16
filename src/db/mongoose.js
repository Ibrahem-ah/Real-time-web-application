const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://IAH:IjGuSdDDV4j0n0SD@cluster0.csbz5.mongodb.net/paymentsTracker?retryWrites=true&w=majority'
  )
  .then((result) => {
    console.log('http://localhost:3000');
    console.log('Connected!');
  })
  .catch((err) => {
    console.log(err);
  });
