require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger.middleware'); 
const contatoRoutes = require('./routes/contato.routes');
const inscricaoRoutes = require('./routes/inscricao.routes');

const app = express();
const PORT = 3001;

// Configurações
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(logger);

// Rotas
app.use('/api/contato', contatoRoutes);
app.use('/api/inscricao', inscricaoRoutes);

// Health Check
app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'online' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});