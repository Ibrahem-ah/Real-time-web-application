$(document).ready(function () {
  $('#form1').on('submit', function (event) {
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();

    $.ajax({
      url: '/login',
      method: 'post',
      dataType: 'json',
      data: { email, password },
      success: function (res) {
        if (res.response) {
          //How to add class name
          $('#password').css('margin-bottom', '0px');

          var elementExist = document.getElementById('exist');
          if (!elementExist) {
            $(
              `<label> <em id='exist'>${res.response}</em> </label>;`
            ).insertAfter('#password');
          }

          // myVar = 1
          // $('.emailExist').css('display', 'block');
          // $('.emailExist').css('margin-bottom', '15px');
          // $('h1').html(`Hello ${res.response}`);
        } else {
          location.href = '/homepage';
        }
      },
    });
  });
});
