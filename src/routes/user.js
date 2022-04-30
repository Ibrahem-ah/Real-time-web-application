var express = require('express');
var router = express.Router();

const user = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', user.getLoginPage);
router.post('/login', user.postLoginPage);

router.get('/register', user.getRegister);
router.post('/register', user.postRegister);

router.get('/homepage', auth, user.getHomepage);
router.get('/chat', auth, user.getChat);

router.post('/uploadImage', auth, user.postUploadImage);

module.exports = router;
