var express = require('express');
var router = express.Router();
const user = require('../controllers/user');

router.get('/', user.getLoginPage);
router.post('/login', user.postLoginPage);

router.get('/register', user.getSignUp);
router.post('/register', user.postSignUp);

router.get('/homepage', user.getHomepage);


module.exports = router;
