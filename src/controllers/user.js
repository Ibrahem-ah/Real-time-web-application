const bcrypt = require('bcryptjs');
const UserBlog = require('../models/user');

exports.getChat = (req, res, next) => {
  res.render('chat')
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

    if (!user && email) {
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
    } else {
      invalid.email = 'Email already exist. Please Login';
    }

    if (Object.keys(invalid).length > 0) {
      throw ' ';
    }
  } catch (err) {
    res.send({ emailExist: invalid.email, pswExist: invalid.password });
  }
};

exports.getHomepage = async (req, res, next) => {
  res.render('homepage');
};
