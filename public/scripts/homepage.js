$(document).ready(function () {
  $('#photoForm').change('submit', function (event) {
    // event.preventDefault();
    $.ajax({
      url: '/uploadImage',
      method: 'post',
      data: new FormData(this),
      processData: false,
      contentType: false,
      success: function (res) {
        if (Object.keys(res).length > 0) {
          if (res.largefile) {
            alert(res.largefile);
          } else if (res.onlyImages) {
            console.log('test1');
            var elementExist = document.getElementById('onlyImages');
            if (!elementExist) {
              $(
                `<label style='margin-left:0px;margin-top:0px' class='errMessage'> <em id='onlyImages'>${res.onlyImages}</em> </label>;`
              ).insertAfter('#blah');
            }
          }
        } else {
          $('#onlyImages').remove();
          var reader = new FileReader();

          reader.onload = function (e) {
            $('#blah').attr('src', e.target.result).width(120).height(120);
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      },
    });
  });
});
