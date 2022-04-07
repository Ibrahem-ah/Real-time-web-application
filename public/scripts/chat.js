const socket = io();

// const $messageForm = $('#form1');
// const $messageFormInput = $('input');
// const $messageFormButton = $('button');
// const $sendLocationButton = $('#share-location');
// var a = $('#message-template').html();

///////////////////////////HERE ///////////////////////////////////////////////////
socket.on('message', (message) => {
  const html = Mustache.render($('#message-template').html(), {
    message: message.text,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  $('#messages').append(html);
});

socket.on('LocationMessage', (message) => {
  // $('#messages').append('<p><a>hello there</a><p>');

  const html = Mustache.render($('#location-message-template').html(), {
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  $('#messages').append(html);
});

$('#form1').on('submit', (e) => {
  e.preventDefault();

  $('button').attr('disabled', 'true');

  const message = $('input').val();
  $('input').val('').focus();

  socket.emit('sendMessage', message, (message) => {
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
