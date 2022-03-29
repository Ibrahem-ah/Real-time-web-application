const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const CookieParser = require('cookie-parser');

require('./db/mongoose');
require('dotenv').config();

const routes = require('./routes/user');


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


let count = 0;

io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  socket.emit('countUpdated')
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
