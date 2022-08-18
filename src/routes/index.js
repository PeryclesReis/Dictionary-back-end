const express = require('express');
const rescue = require('express-rescue');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.post('/login', rescue(userControllers.login));
router.post('/register', rescue(userControllers.registerUser));
// router.put('/perfil', rescue(usuarioController.atualizarUsuario));

module.exports = router;
