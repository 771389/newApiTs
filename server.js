const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');  // Corrigido para a importação correta
const app = express();
const port = process.env.PORT || 3001;

// Chave secreta para gerar e verificar os tokens
const SECRET_KEY = 'androidx&clubedosfilmes';

// Carregar os arquivos JSON
const adultos = require('./routes/adultos.json');
const canais1 = require('./routes/canais1.json');
const cineprime = require('./routes/cineprime.json');

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());  // Adicionado para lidar com dados JSON

// Middleware para verificar o token
const authMiddleware = expressJwt({
  secret: SECRET_KEY,
  algorithms: ['HS256']
}).unless({
  path: ['/login'] // Apenas a rota de login não exige autenticação
});

// Rota para fazer login e gerar o token
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Se as credenciais estiverem corretas, gera o token
  if (usuario === 'vitor' && senha === 'spazio3132') {
    const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '1h' }); // Token expira em 1 hora
    return res.json({ token });
  }

  return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
});

// Proteger as rotas com o middleware de autenticação
app.use(authMiddleware);

// Rota para retornar o arquivo adultos.json
app.get('/routes/adultos', (req, res) => res.json(adultos));

// Rota para retornar o arquivo canais1.json
app.get('/routes/canais1', (req, res) => res.json(canais1));

// Rota para retornar o arquivo cineprime.json
app.get('/routes/cineprime', (req, res) => res.json(cineprime));

// Inicia o servidor
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
