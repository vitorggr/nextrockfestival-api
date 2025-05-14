const fs = require('fs/promises');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/contato.json');

async function enviarMensagem(req, res) {
  try {
    debugger;
    let mensagens = [];
    const { titulo, nome, email, descricao } = req.body;

    if (!titulo || !nome || !email || !descricao) {
      return res.status(400).json({ error: "Dados incompletos!" });
    }

    // Lê e atualiza o JSON
    const rawData = await fs.readFile(DATA_PATH, 'utf-8');
    mensagens = rawData.trim() ? JSON.parse(rawData) : []; // Trata vazio
    mensagens.push({ titulo, nome, email, descricao, data: new Date() });
    await fs.writeFile(DATA_PATH, JSON.stringify(mensagens, null, 2));

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar mensagem" });
  }
}

module.exports = { enviarMensagem };