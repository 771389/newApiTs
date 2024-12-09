const express = require('express');
const filmes = require('./routes/filmes.json');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para garantir que o Express entenda o JSON
app.use(express.json());

// Rota para retornar filmes com paginação
app.get('/home/filmes', (req, res) => {
  try {
    // Parâmetros de consulta: página e limite
    const page = parseInt(req.query.page) || 1; // Página atual, padrão é 1
    const limit = parseInt(req.query.limit) || 20; // Limite de itens por página, padrão é 20

    // Calcula os índices para retornar apenas uma parte dos filmes
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Filtra os filmes com base no índice calculado
    const filmesPagina = filmes.slice(startIndex, endIndex);

    if (filmesPagina.length === 0) {
      return res.status(404).json({ erro: 'Nenhum filme encontrado.' });
    }

    // Resposta com a paginação
    res.json({
      page: page,
      limit: limit,
      total: filmes.length,
      filmes: filmesPagina
    });
  } catch (err) {
    console.error(err); // Log do erro para debug
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

// Rota para pesquisar filmes por nome ou qualquer termo em qualquer campo do filme
app.get('/home/pesquisa', (req, res) => {
  try {
    const query = req.query.query;  // Recebe o parâmetro de pesquisa da URL
    if (!query) {
      return res.status(400).json({ erro: 'Parâmetro "query" é obrigatório.' });
    }

    // Parâmetros de página e limite
    const page = parseInt(req.query.page) || 1; // Página atual, padrão é 1
    const limit = parseInt(req.query.limit) || 20; // Limite de itens por página, padrão é 20

    // Filtra os filmes com base no termo de pesquisa que aparece em qualquer campo do filme
    const filmesEncontrados = filmes.filter(filme =>
      Object.values(filme).some(value =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );

    // Calcula os índices para retornar apenas uma parte dos filmes
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Filtra os filmes encontrados com base no índice calculado
    const filmesPagina = filmesEncontrados.slice(startIndex, endIndex);

    if (filmesPagina.length === 0) {
      return res.status(404).json({ erro: 'Nenhum filme encontrado.' });
    }

    // Resposta com a paginação
    res.json({
      page: page,
      limit: limit,
      total: filmesEncontrados.length,
      filmes: filmesPagina
    });
  } catch (err) {
    console.error(err);  // Log do erro para debug
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
