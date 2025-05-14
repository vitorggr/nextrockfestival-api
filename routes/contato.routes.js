const express = require('express');
const router = express.Router();
const { enviarMensagem } = require('../controllers/contato.controller');

// POST /api/contato (sem autenticação)
router.post('/', enviarMensagem);

module.exports = router;