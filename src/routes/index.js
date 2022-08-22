const express = require('express');
const auth = require('../routes/auth');
const user = require('../routes/user');
const words = require('../routes/words');

const router = express.Router();

router.use(auth, user, words);

module.exports = router;
