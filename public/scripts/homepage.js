$(document).ready(function () {
  $('#photoForm').change('submit', function (event) {
    console.log(event.target);
    // event.preventDefault();
    $.ajax({
      url: '/uploadImage',
      method: 'post',
      data: new FormData(this),
      processData: false,
      contentType: false,
      success: function (res) {
        if (res.largefile) {
          alert(res.largefile);
        } else {
          var reader = new FileReader();

          reader.onload = function (e) {
            $('#blah').attr('src', e.target.result).width(120).height(120);
          };

          reader.readAsDataURL(event.target.files[0]);

          console.log('file is not large');
        }
      },
    });
  });
});
