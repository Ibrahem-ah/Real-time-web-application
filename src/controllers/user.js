//import the db schema in here
const UserBlog = require('../models/user');

exports.getLoginPage = (req, res, next) => {
  res.render('login');
};
exports.postLoginPage = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserBlog.findOne({ email: email, password: password });
    console.log(user);
    if (user) {
      console.log('test');
      res.send({});
    } else {
      throw 'Email or Password is Incorrect';
    }
  } catch (err) {
    res.send({ response: err });
  }
};

exports.getSignUp = (req, res, next) => {
  res.render('register', { header: 'Sign Up' });
};

exports.postSignUp = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  //   const cpassword = req.body.cpassword;
  try {
    const user = await UserBlog.findOne({ email: email });

    if (!user) {
      await new UserBlog({
        username: username,
        email: email,
        password: password,
      }).save();

      res.send({});
    } else {
      throw 'Email already exist!';
    }
  } catch (err) {
    // console.log(err);
    res.send({ response: err });
  }
};

exports.getHomepage = async (req, res, next) => {
  res.render('homepage');
};

// exports.loginPage('/login', (req, res) => {
//   const username = req.body.email;
//   console.log(username);

//   res.render('homepage');
// });

// app.get('/register', (req, res) => {
//   res.render('register');
// });

// app.post('/register', (req, res) => {
//

//   console.log(username + email + password + cpassword);

//   res.render('register');
// });
