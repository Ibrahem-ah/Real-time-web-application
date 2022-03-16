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
          $('#email').css('margin-bottom', '0px');
          $('.emailExist').css('display', 'block');

          // $('.emailExist').css('margin-bottom', '15px');

          // $('h1').html(`Hello ${res.response}`);
        } else {
          location.href = '/homepage';
          console.log('no erors');
        }
      },
    });
  });
});
