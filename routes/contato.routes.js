const express = require('express');
const router = express.Router();
const { enviarMensagem } = require('../controllers/contato.controller');

router.post('/', enviarMensagem);

module.exports = router;