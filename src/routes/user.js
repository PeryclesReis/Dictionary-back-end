const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.get('/', rescue(userControllers.profile));
// Retornar a lista de palavras visitadas
router.get('/history', rescue());
// Retornar a lista de palavras marcadas como favoritas
router.get('/favorites', auth, rescue(userControllers.wordFavorites));

module.exports = router;
