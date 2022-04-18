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
const { addUser, getUsersInRoom, removeUser } = require('./utils/users');

app.use(CookieParser());

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'public/views'); //the second argument is the file location

app.use(routes);

app.get('*', function (req, res) {
  res.status(404).send('404 Page not found!');
});

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', async ({ displayname, room, username }, callback) => {
    const { error } = (await addUser(room, username)) || {};
    if (error) {
      // return callback(error);
    }

    var user = await getUsersInRoom(room);
    socket.username = username;
    socket.room = room;

    socket.join(room);

    socket.emit('message', generateMessage('welcome', 'Admin'));
    socket.broadcast
      .to(room)
      .emit('message', generateMessage('has joined!', username));

    io.to(room).emit('roomData', { room: user.room, users: user.users });

    callback();
  });

  socket.on('sendMessage', (message, username, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!');
    }
    io.to(socket.room.toString()).emit(
      'message',
      generateMessage(message, username)
    );
    callback();
  });

  socket.on('sendLocation', (coords, callback) => {
    io.to(socket.room.toString()).emit(
      'LocationMessage',
      generateLocationMessage(
        `https://maps.google.com/?q=${coords.latitude},${coords.longitude}`,
        socket.username
      )
    );

    callback();
  });

  socket.on('disconnect', async () => {
    const user = await removeUser(socket.username);
    if (user) {
      io.to(user[0].room.toString()).emit(
        'message',
        generateMessage('has left!', user[1].user)
      );
      const users = await getUsersInRoom(user[0].room.toString());
      io.to(user[0].room.toString()).emit('roomData', {
        room: user[0].room.toString(),
        users: users.users,
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
