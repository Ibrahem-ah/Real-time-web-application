$(document).ready(function () {
  $('#form1').on('submit', async function (event) {
    event.preventDefault();
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const cpassword = $('#cpassword').val();

    fetch(`https://app.verify-email.org/api/v1/{key}/verify/${email}`)
      .then((response) => {
        console.log(response.json());
      })
      .catch(function (err) {
        console.log('Unable to fetch -', err);
      });

    // let url = `https://app.verify-email.org/api/v1/{key}/verify/${email}`;
    // let response = await fetch(url);
    // const data = await response.json();
    // console.log(data);

    $.ajax({
      url: '/register',
      method: 'post',
      dataType: 'json',
      data: { username, email, password, cpassword },
      success: function (res) {
        if (Object.keys(res).length > 0) {
          if (res.emailExist || $('#emailExist').length > 0) {
            var elementExist = document.getElementById('emailExist');
            if (!elementExist) {
              $(
                `<label class='errMessage'> <em id='emailExist'>${res.emailExist}</em> </label>;`
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
                `<label class='errMessage'> <em id='pswExist'>${res.pswExist}</em> </label>;`
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
