const fs = require('fs/promises');
const path = require('path');

const LOGS_PATH = path.join(__dirname, '../data/logs.json');

async function requestLogger(req, res, next) {
  try {
    const logEntry = {
      timestamp: new Date().toLocaleString('pt-BR'),
      method: req.method,
      url: req.url,
      body: ['POST', 'PUT'].includes(req.method) ? req.body : null // Loga body apenas para POST/PUT
    };

    let logs = [];
    try {
      const existingData = await fs.readFile(LOGS_PATH, 'utf-8');
      logs = JSON.parse(existingData);
    } catch (error) {
      console.error(error);
    }

    logs.push(logEntry);

    await fs.writeFile(LOGS_PATH, JSON.stringify(logs, null, 2));

    next();
  } catch (error) {
    console.error('Falha ao salvar log:', error);
    next(); 
  }
}

module.exports = requestLogger;