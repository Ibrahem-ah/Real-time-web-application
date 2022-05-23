const bcrypt = require('bcryptjs');
const UserBlog = require('../models/user');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    const uniqueSuffix = req.user.username + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2500000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('myImage');

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;

  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

exports.getChat = (req, res, next) => {
  res.render('chat', { user: req.user });
};

exports.getLoginPage = (req, res, next) => {
  res.cookie('auth_token', '');
  res.render('login', { test: '0' });
};

exports.postLoginPage = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserBlog.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      var token = await user.generateAuthToken();
      res.cookie('auth_token', token);

      res.send({});
    } else {
      throw 'Email or Password is Incorrect!';
    }
  } catch (err) {
    res.send({ response: err });
  }
};

exports.getRegister = (req, res, next) => {
  res.render('register', { header: 'Sign Up' });
};

exports.postRegister = async (req, res, next) => {
  const { username, email, password, cpassword } = req.body;

  const invalid = {};
  try {
    if (password != cpassword) {
      invalid.password = 'Passwords are not the same!';
    }
    const user = await UserBlog.findOne({ email: email.toLowerCase() });
    const usernameExist = await UserBlog.findOne({
      username: username,
    });

    var compare =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    if (!user && !usernameExist && email.match(compare)) {
      if (!invalid.password) {
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await new UserBlog({
          username: username,
          email: email.toLowerCase(),
          password: encryptedPassword,
        }).save();

        var token = await user.generateAuthToken();
        res.cookie('auth_token', token);

        return res.send({});
      }
    } else if (!email) {
      invalid.email = 'Please enter an email';
    } else if (!email.match(compare)) {
      invalid.email = 'Please enter a valid email';
    } else if (user) {
      invalid.email = 'Email already exist. Please Login';
    }

    if (usernameExist) {
      invalid.username = 'username already exist';
    }

    if (Object.keys(invalid).length > 0) {
      throw ' ';
    }
  } catch (err) {
    res.send({
      emailExist: invalid.email,
      pswExist: invalid.password,
      usernameExist: invalid.username,
    });
  }
};

exports.getHomepage = async (req, res, next) => {
  res.render('homepage', { user: req.user });
};

exports.postUploadImage = async (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        res.send({ largefile: err.message, onlyImages: err });
      } else {
        req.user.avatar = req.file.filename;
        await req.user.save();
        return res.send({});
      }
    } catch (err) {
      console.log(err);
    }
  });
};
