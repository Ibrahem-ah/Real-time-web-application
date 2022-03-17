var express = require('express');
var router = express.Router();
const user = require('../controllers/user');

router.get('/', user.getLoginPage);
router.post('/login', user.postLoginPage);

router.get('/register', user.getRegister);
router.post('/register', user.postRegister);

router.get('/homepage', user.getHomepage);


module.exports = router;
