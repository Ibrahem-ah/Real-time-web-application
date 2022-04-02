const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Filter = require('bad-words');
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

/////////////////////////////////-- Socket.io --////////////////////////////////////////////
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.emit('message', 'Welcome!');
  socket.broadcast.emit('message', 'A new user has joined!');

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!');
    }

    io.emit('message', message);
    callback();
  });

  socket.on('sendLocation', (coords, callback) => {
    io.emit(
      'message',
      `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`
    );

    callback();
    // io.emit('message', `Location: ${coords.latitude} ${coords.longitude}`);
  });

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
