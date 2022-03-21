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
          $('#password').css('margin-bottom', '0px');

          var elementExist = document.getElementById('exist');
          if (!elementExist) {
            $(
              `<label class='errMessage'> <em id='exist'>${res.response}</em> </label>;`
            ).insertAfter('#password');
          }
        } else {
          location.href = '/homepage';
        }
      },
    });
  });
});
