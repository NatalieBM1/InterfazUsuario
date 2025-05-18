const express = require('express');
const InicioController = require('../controllers/InicioController');

const router = express.Router();

router.get('/inicio', InicioController.inicio);
router.post('/inicio', InicioController.auth);
router.get('/registro', InicioController.registro);
router.post('/registro', InicioController.storeUser);
router.get('/logout', InicioController.logout);


module.exports = router;