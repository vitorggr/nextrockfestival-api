require('dotenv').config({ path: '.env.local' }); // Carrega o .env.local
const admin = require('firebase-admin');

console.log('[DEBUG] Variáveis carregadas:', {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY ? 'existe' : 'não existe'
});

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') // Remove ?. pois a chave deve existir
};

console.log('[DEBUG] Firebase Config:', {
  ...firebaseConfig,
  privateKey: firebaseConfig.privateKey.substring(0, 20) + '...' // Mostra só parte da chave
});

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig)
    });
    console.log('[DEBUG] Firebase inicializado com sucesso!');
  }
} catch (error) {
  console.error('[DEBUG] Erro ao inicializar Firebase:', error);
  throw error; 
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Token não fornecido!" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('[DEBUG] Erro ao verificar token:', error);
    res.status(401).json({ error: "Token inválido!" });
  }
};

module.exports = verifyToken;