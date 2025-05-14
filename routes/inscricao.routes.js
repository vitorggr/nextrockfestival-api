const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const {
  listarInscricoes,
  criarInscricao,
  atualizarInscricao,
  deletarInscricao,
  alterarStatusInscricao
} = require('../controllers/inscricao.controller');

router.get('/', verifyToken, listarInscricoes);
router.post('/', verifyToken, criarInscricao);
router.put('/:id', verifyToken, atualizarInscricao);
router.delete('/:id', verifyToken, deletarInscricao);
router.patch('/:id/status', verifyToken, alterarStatusInscricao);

module.exports = router;