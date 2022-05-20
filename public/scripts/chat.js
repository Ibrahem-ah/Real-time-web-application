const socket = io();

// const $messageForm = $('#form1');
// const $messageFormInput = $('input');
// const $messageFormButton = $('button');
// const $sendLocationButton = $('#share-location');
// var a = $('#message-template').html();

const username = $('#username').val(); //get username using ejs

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }
// const userToken = getCookie('auth_token');

///////////////////////////HERE ///////////////////////////////////////////////////
var { room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoscroll = () => {
  const $messages = document.getElementById('messages');
  const newMessage = $messages.lastElementChild;
  const newMessageStyles = getComputedStyle(newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

  const visibleHeight = $messages.offsetHeight;

  const containerHeight = $messages.scrollHeight;
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.on('message', (message) => {
  const html = Mustache.render($('#message-template').html(), {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  $('#messages').append(html);
  autoscroll();
});

socket.on('LocationMessage', (message) => {
  // $('#messages').append('<p><a>hello there</a><p>');
  console.log(message);
  const html = Mustache.render($('#location-message-template').html(), {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  $('#messages').append(html);
  autoscroll();
});

$('#form1').on('submit', (e) => {
  e.preventDefault();

  $('button').attr('disabled', 'true');

  const message = $('input').val();
  // console.log(username);
  $('#messageInput').val('').focus();

  socket.emit('sendMessage', message, username, (message) => {
    $('button').removeAttr('disabled');
    if (message) {
      return console.log(message);
    }
    console.log('Message delivered!');
  });
});

$('#share-location').on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }
  $('button').attr('disabled', 'true');
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      'sendLocation',
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        $('button').removeAttr('disabled');
        console.log('Location Shared 👍');
      }
    );
  });
});

socket.on('roomData', ({ roomData }) => {
  const html = Mustache.render($('#sidebar-template').html(), {
    room: roomData.room,
    users: roomData.users,
  });
  $('#sidebar').html(html);
});

socket.emit('join', { room, username }, (error) => {
  if (error) {
    alert(error);
    location.href = '/homepage';
  }
});
