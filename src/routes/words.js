const express = require('express');
const rescue = require('express-rescue');
const apiExternalController = require('../controllers/apiControllers');
const downloadWords = require('../middlewares/downloadWords');

const router = express.Router();

router.get('/en', downloadWords, rescue(apiExternalController.dictionary));
router.get('/en/:word', rescue(apiExternalController.words));
// Salva a palavra na lista de favoritas (retorno opcional)
// router.post('/en/:word/favorite', rescue());
// Remover a palavra da lista de favoritas (retorno opcional)
// router.delete('/en/:word/unfavorite', rescue(apiExternalController));

module.exports = router;
