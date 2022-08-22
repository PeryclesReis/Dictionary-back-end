const express = require('express');
const rescue = require('express-rescue');
const userControllers = require('../controllers/userControllers');
const validateUser = require('../middlewares/validateUser');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/singin', auth, rescue(userControllers.login));
router.post('/singup', validateUser, rescue(userControllers.registerUser));

module.exports = router;
