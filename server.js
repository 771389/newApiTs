const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');  // Corrigido para a importação correta
const app = express();
const port = process.env.PORT || 3001;

// Chave secreta para gerar e verificar os tokens
const SECRET_KEY = 'androidx&clubedosfilmes';

// Carregar os arquivos JSON
const adultos = require('./routes/server.iptvxxx.net.json');
const canais1 = require('./routes/84.16.253.11.json');
const cineprime = require('./routes/178.162.197.177.json');
const pegasus = require('./routes/pegasus.tvvip.live.json');
const categorias = require('./routes/categorias.json');
const cebola = require('./routes/dns.cebola.pro');
const authxplus = require('./routes/authxplus-2.xyz.json');
const uniplay = require('./routes/uniplayuhd.cdn23.click.json');
const vipy = require('./routes/vipy.pro.json');
const cebola = require('./routes/dns.cebola.pro.json');

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
app.get('/routes/server.iptvxxx.net', (req, res) => res.json(adultos));

// Rota para retornar o arquivo canais1.json
app.get('/routes/84.16.253.11', (req, res) => res.json(canais1));

// Rota para retornar o arquivo cineprime.json
app.get('/routes/178.162.197.177', (req, res) => res.json(cineprime));

// Rota para retornar o arquivo pegasus.json
app.get('/routes/pegasus.tvvip.live', (req, res) => res.json(pegasus));


// Rota para retornar o arquivo categorias.json
app.get('/routes/categorias', (req, res) => res.json(categorias));

// Rota para retornar o arquivo authplus.json
app.get('/routes/authxplus-2.xyz', (req, res) => res.json(authxplus));







// Rota para retornar o arquivo dns.cebola.pro json
app.get('/routes/dns.cebola.pro', (req, res) => res.json(cebola));

// Rota para retornar o arquivo uniplayuhd.cdn23.click json
app.get('/routes/uniplayuhd.cdn23.click', (req, res) => res.json(uniplay));

// Rota para retornar o arquivo vip.pro json
app.get('/routes/vipy.pro', (req, res) => res.json(vipy));


















// Inicia o servidor
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
