const express = require('express');
const rescue = require('express-rescue');
const userControllers = require('../controllers/userControllers');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.post('/singin', rescue(userControllers.login));
router.post('/singup', validateUser, rescue(userControllers.registerUser));

module.exports = router;
