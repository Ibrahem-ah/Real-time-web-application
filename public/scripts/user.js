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
        if (Object.keys(res).length > 0) {
          
          if (res.emailExist || Object.keys($('#emailExist')).length > 0) {
            var elementExist = document.getElementById('emailExist');
            if (!elementExist) {
              $(
                `<label> <em id='emailExist'>${res.emailExist}</em> </label>;`
              ).insertAfter('#email');
            } else if (!res.emailExist) {
              
              $('#emailExist').remove();
            }

            // elementExist.parentNode.removeChild(emailExist);
          }
          if (res.pswExist) {
            var elementExist = document.getElementById('pswExist');
            if (!elementExist) {
              $(
                `<label> <em id='pswExist'>${res.pswExist}</em> </label>;`
              ).insertAfter('#cpassword');
            }
          }

          //How to add class name
          // $('#password').css('margin-bottom', '0px');

        } else {
          location.href = '/homepage';
        }
      },
    });
  });
});
