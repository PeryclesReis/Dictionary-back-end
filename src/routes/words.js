const express = require('express');
const rescue = require('express-rescue');
const apiExternalController = require('../controllers/apiControllers');
const userController = require('../controllers/userControllers');
const downloadWords = require('../middlewares/downloadWords');

const router = express.Router();

router.get('/:word', rescue(apiExternalController.words));
router.post('/', downloadWords, rescue(apiExternalController.dictionary));
router.post('/:word/favorite', rescue(userController.addWord));
router.delete('/:word/unfavorite', rescue(userController.removeWord));

module.exports = router;
