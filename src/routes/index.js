const express = require('express');
const rescue = require('express-rescue');
const userControllers = require('../controllers/userControllers');
const apiExternalController = require('../controllers/apiControllers');

const router = express.Router();

router.post('/auth/singin', rescue(userControllers.login));
router.post('/auth/singup', rescue(userControllers.registerUser));

router.get('/user/me', rescue(userControllers.profile));
// router.post('/user/me/history', rescue());
// router.post('/user/me/favorites', rescue());

// router.get('/entries/en', rescue(apiExternalController));
router.get('/entries/en/:word', rescue(apiExternalController.words));
// router.post('/entries/en/:word/favorite', rescue(apiExternalController));
// router.delete('/entries/en/:word/unfavorite', rescue(apiExternalController));

module.exports = router;
