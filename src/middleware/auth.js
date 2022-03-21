const jwt = require('jsonwebtoken');
const UserBlog = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies['auth_token'];
    

    const decoded = jwt.verify(token, 'thisisibrahimproject');
    const user = await UserBlog.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).render('unauthorized');
  }
};

module.exports = auth;
