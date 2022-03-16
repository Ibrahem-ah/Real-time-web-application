$(document).ready(function () {
  $('#form1').on('submit', function (event) {
    event.preventDefault();
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const cpassword = $('#cpassword').val();

    // console.log(username);

    $.ajax({
      url: '/register',
      method: 'post',
      dataType: 'json',
      data: { username, email, password, cpassword },
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
