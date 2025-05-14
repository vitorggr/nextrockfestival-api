const contatoService = require('../services/contato.service');

async function listarMensagens(req, res) {
  try {
    const mensagens = await contatoService.listar();
    res.json(mensagens);
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    res.status(500).json({ error: 'Erro ao listar mensagens.' });
  }
}

async function enviarMensagem(req, res) {
  try {
    const { titulo, nome, email, descricao } = req.body;

    if (!titulo || !nome || !email || !descricao) {
      return res.status(400).json({ error: "Dados incompletos!" });
    }

    const mensagem = await contatoService.criar({
      titulo,
      nome,
      email,
      descricao
    });

    res.status(201).json({ success: true, data: mensagem });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ error: "Erro ao salvar mensagem" });
  }
}

module.exports = { 
  enviarMensagem,
  listarMensagens
};