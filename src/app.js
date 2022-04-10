const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Filter = require('bad-words');
const CookieParser = require('cookie-parser');

const {
  generateMessage,
  generateLocationMessage,
} = require('./utils/messages');
require('./db/mongoose');
require('dotenv').config();

const routes = require('./routes/user');

app.use(CookieParser());

const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'public/views'); //the second argument is the file location

app.use(routes);

app.get('*', function (req, res) {
  // res.status(404).send('404 Page notfound');

  res.send('ERROR!!');
});

/////////////////////////////////-- Socket.io --////////////////////////////////////////////
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', ({ username, room }) => {
    socket.join(room);

    socket.emit('message', generateMessage('welcome'));
    socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`));
  });

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!');
    }
// console.log(room);
    io.to('1').emit('message', generateMessage(message));
    callback();
  });

  socket.on('sendLocation', (coords, callback) => {
    io.emit(
      'LocationMessage',
      generateLocationMessage(
        `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`
      )
    );

    callback();
  });

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left!'));
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
