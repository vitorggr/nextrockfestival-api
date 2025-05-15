const contatoService = require('../services/contato.service');

async function listarMensagens(req, res) {
  try {
    const mensagens = await contatoService.listar();
    res.json({
      success: true,
      data: mensagens
    });
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao listar mensagens.' 
    });
  }
}

async function enviarMensagem(req, res) {
  try {
    const { titulo, nome, email, descricao } = req.body;

    // Verificação inicial dos campos
    if (!titulo || !nome || !email || !descricao) {
      return res.status(400).json({ 
        success: false,
        error: "Por favor, preencha todos os campos obrigatórios." 
      });
    }

    const mensagem = await contatoService.criar({
      titulo: titulo.trim(),
      nome: nome.trim(),
      email: email.trim(),
      descricao: descricao.trim()
    });

    res.status(201).json({ 
      success: true, 
      message: "Mensagem enviada com sucesso!",
      data: mensagem 
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    
    // Verifica se é um erro de validação
    if (error.message.includes('obrigatório') || error.message.includes('inválido')) {
      return res.status(400).json({ 
        success: false,
        error: error.message 
      });
    }

    res.status(500).json({ 
      success: false,
      error: "Erro ao processar sua mensagem. Por favor, tente novamente." 
    });
  }
}

module.exports = { 
  enviarMensagem,
  listarMensagens
};