const express = require('express');
const rescue = require('express-rescue');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.get('/me', rescue(userControllers.profile));
// Retornar a lista de palavras visitadas
// router.post('/me/history', rescue());
// Retornar a lista de palavras marcadas como favoritas
// router.post('/me/favorites', rescue());

module.exports = router;
