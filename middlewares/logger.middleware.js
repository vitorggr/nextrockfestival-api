const fs = require('fs/promises');
const path = require('path');

// Caminho para o arquivo de logs
const LOGS_PATH = path.join(__dirname, '../data/logs.json');

async function requestLogger(req, res, next) {
  try {
    // 1. Criar entrada de log
    const logEntry = {
      timestamp: new Date().toLocaleString('pt-BR'),
      method: req.method,
      url: req.url,
      body: ['POST', 'PUT'].includes(req.method) ? req.body : null // Loga body apenas para POST/PUT
    };

    // 2. Ler logs existentes
    let logs = [];
    try {
      const existingData = await fs.readFile(LOGS_PATH, 'utf-8');
      logs = JSON.parse(existingData);
    } catch (error) {
      // Arquivo não existe ainda - inicia array vazio
    }

    // 3. Adicionar novo log
    logs.push(logEntry);

    // 4. Salvar no arquivo
    await fs.writeFile(LOGS_PATH, JSON.stringify(logs, null, 2));

    // 5. Continuar o fluxo
    next();
  } catch (error) {
    console.error('Falha ao salvar log:', error);
    next(); // Importante: não quebrar o fluxo mesmo com erro no logger
  }
}

module.exports = requestLogger;