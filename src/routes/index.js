const express = require('express');
const rescue = require('express-rescue');
const userControllers = require('../controllers/userControllers');
const apiExternalController = require('../controllers/apiControllers');

const router = express.Router();

router.post('/auth/singin', rescue(userControllers.login));
router.post('/auth/singup', rescue(userControllers.registerUser));

router.get('/user/me', rescue(userControllers.profile));

// Retornar a lista de palavras visitadas
// router.post('/user/me/history', rescue());
// Retornar a lista de palavras marcadas como favoritas
// router.post('/user/me/favorites', rescue());

router.get('/entries/en', rescue(apiExternalController.dictionary));
router.get('/entries/en/:word', rescue(apiExternalController.words));

// Salva a palavra na lista de favoritas (retorno opcional)
// router.post('/entries/en/:word/favorite', rescue(apiExternalController));
// Remover a palavra da lista de favoritas (retorno opcional)
// router.delete('/entries/en/:word/unfavorite', rescue(apiExternalController));

module.exports = router;
