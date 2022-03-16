const express = require('express');
require('./db/mongoose');

const routes = require('./routes/signIn-signUp');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views'); //the second argument is the file location

app.use(routes);

app.get('*', function (req, res) {
  // res.status(404).send('404 Page notfound');

  res.send('ERROR!!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
