require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger.middleware'); 
const contatoRoutes = require('./routes/contato.routes');
const inscricaoRoutes = require('./routes/inscricao.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Configurações
app.use(cors({ 
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(logger);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'Next Rock Festival API',
    version: '1.0.0',
    endpoints: {
      health: '/ping',
      inscricoes: '/api/inscricao',
      contato: '/api/contato'
    }
  });
});

// Rotas
app.use('/api/contato', contatoRoutes);
app.use('/api/inscricao', inscricaoRoutes);

// Health Check
app.get('/ping', (req, res) => {
  res.json({ status: 'ok' });
});

// Inicialização
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});