const express = require('express');
const CookieParser = require('cookie-parser');

require('./db/mongoose');
require('dotenv').config();

const routes = require('./routes/signIn-signUp');

const app = express();
app.use(CookieParser());

const port = process.env.PORT;

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
