// add the path module

const imageUpload = () => {
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });

  const upload = multer({ storage: storage }).single('myImage');

  return upload;
};

module.exports = { imageUpload };
