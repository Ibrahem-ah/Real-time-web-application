$(document).ready(function () {
  $('#form1').on('submit', async function (event) {
    event.preventDefault();
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const cpassword = $('#cpassword').val();

    $.ajax({
      url: '/register',
      method: 'post',
      dataType: 'json',
      data: { username, email, password, cpassword },
      success: function (res) {
        console.log(res);
        if (Object.keys(res).length > 0) {


          if (res.usernameExist || $('#usernameExist').length > 0) {
            var elementExist = document.getElementById('usernameExist');
            if (!elementExist) {
              $(
                `<label style='margin-top:0px' class='errMessage'> <em id='usernameExist'>${res.usernameExist}</em> </label>;`
              ).insertAfter('#username');
            } else if (!res.usernameExist) {
              $('#usernameExist').remove();
            }
          }

          if (res.emailExist || $('#emailExist').length > 0) {
            var elementExist = document.getElementById('emailExist');
            if (!elementExist) {
              $(
                `<label style='margin-top:0px' class='errMessage'> <em id='emailExist'>${res.emailExist}</em> </label>;`
              ).insertAfter('#email');
            } else if (!res.emailExist) {
              $('#emailExist').remove();
            } else {
              $('#emailExist').html(res.emailExist);
            }
          }
          if (res.pswExist || $('#pswExist').length > 0) {
            var elementExist = document.getElementById('pswExist');
            if (!elementExist) {
              $(
                `<label style='margin-top:0px' class='errMessage'> <em id='pswExist'>${res.pswExist}</em> </label>;`
              ).insertAfter('#cpassword');
            } else if (!res.pswExist) {
              $('#pswExist').remove();
            }
          }
        } else {
          location.href = '/homepage';
        }
      },
    });
  });
});
