const inscricaoService = require('../services/inscricao.service');

async function listarInscricoes(req, res) {
  try {
    const inscricoes = await inscricaoService.listarPorUsuario(req.user.uid);
    res.json(inscricoes);
  } catch (error) {
    console.error('Erro ao listar inscrições:', error);
    res.status(500).json({ error: 'Erro ao listar inscrições.' });
  }
}

async function criarInscricao(req, res) {
  try {
    const { body, user } = req;

    if (!body.integrantes || !body.integrantes.length) {
      return res.status(400).json({ error: 'É necessário pelo menos um integrante.' });
    }

    const dadosInscricao = { ...body, ativo: true };

    const novaInscricao = await inscricaoService.criar({
      uidUsuario: user.uid,
      dados: dadosInscricao
    });

    res.status(201).json(novaInscricao);
  } catch (error) {
    console.error('Erro ao criar inscrição:', error);
    res.status(500).json({ error: 'Erro ao criar inscrição.' });
  }
}

async function atualizarInscricao(req, res) {
  try {
    const { params, body, user } = req;

    const inscricaoAtualizada = await inscricaoService.atualizar({
      id: params.id,
      uidUsuario: user.uid,
      dados: body
    });

    if (!inscricaoAtualizada) {
      return res.status(404).json({ error: 'Inscrição não encontrada.' });
    }

    res.json(inscricaoAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar inscrição:', error);
    res.status(500).json({ error: 'Erro ao atualizar inscrição.' });
  }
}

async function deletarInscricao(req, res) {
  try {
    const { params, user } = req;

    const deletado = await inscricaoService.deletar({
      id: params.id,
      uidUsuario: user.uid
    });

    if (!deletado) {
      return res.status(404).json({ error: 'Inscrição não encontrada.' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar inscrição:', error);
    res.status(500).json({ error: 'Erro ao deletar inscrição.' });
  }
}

async function alterarStatusInscricao(req, res) {
  try {
    const { id } = req.params;
    const { ativo } = req.body;
    const { uid } = req.user;

    if (typeof ativo === 'undefined') {
      return res.status(400).json({ error: 'Campo "ativo" é obrigatório' });
    }

    const inscricao = await inscricaoService.alterarStatus({
      id,
      uidUsuario: uid,
      ativo
    });

    if (!inscricao) {
      return res.status(404).json({ error: 'Inscrição não encontrada' });
    }

    res.json(inscricao);

  } catch (error) {
    console.error('Erro no alterarStatusInscricao:', error);
    res.status(500).json({
      error: error.message || 'Erro ao alterar status da inscrição'
    });
  }
}

module.exports = {
  listarInscricoes,
  criarInscricao,
  atualizarInscricao,
  deletarInscricao,
  alterarStatusInscricao
};