const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const app = express();
const port = process.env.PORT || 3000;

// Chave secreta para gerar e verificar os tokens
const SECRET_KEY = 'androidx&clubedosfilmes';

// Carregar os arquivos JSON
const adultos = require('./routes/adultos.json');
const canais1 = require('./routes/canais1.json');
const cineprime = require('./routes/cineprime.json');

// Middleware para verificar o token
const authMiddleware = expressJwt({ secret: SECRET_KEY, algorithms: ['HS256'] }).unless({ path: ['/login'] });

// Rota para fazer login e gerar o token
app.post('/login', (req, res) => {
  // Aqui você deve verificar o usuário e senha de alguma forma (simulado aqui)
  const { usuario, senha } = req.body;

  // Se as credenciais estiverem corretas, gera o token
  if (usuario === 'usuario' && senha === 'senha') {
    const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '1h' }); // Token expira em 1 hora
    return res.json({ token });
  }

  return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
});

// Proteger as rotas com o middleware de autenticação
app.use(authMiddleware);

// Rota para retornar o arquivo adultos.json
app.get('/home/adultos', (req, res) => res.json(adultos));

// Rota para retornar o arquivo canais1.json
app.get('/home/canais1', (req, res) => res.json(canais1));

// Rota para retornar o arquivo cineprime.json
app.get('/home/cineprime', (req, res) => res.json(cineprime));

// Inicia o servidor
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
