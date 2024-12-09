const express = require('express');
const filmes = require('./routes/filmes.json')
const versão = require('./routes/versao')
const tv = require('./routes/tv.json')
const port = process.env.PORT || 3000;

const app = express();

app.get('/home/filmes', (req,res) => {

    return res.json(filmes)
});

app.get('/home/lancamentos', (req,res) => {

  return res.json(lancamentos)
});


app.get('/home/versao', (req,res) => {

  return res.json(versão)
});



app.get('/home/tv', (req,res) => {

  return res.json(tv)
});





// Endpoint de pesquisa
app.get('/home/pesquisa', (req, res) => {
  const tvgName = req.query.tvgName; // Obtém o parâmetro "tvgName" da URL
  if (!tvgName) {
      return res.status(400).json({ erro: 'Parâmetro "tvgName" é obrigatório.' });
  }

  // Filtra os filmes pelo campo "tvgName"
  const resultados = filmes.filter(filme =>
      filme.tvgName.toLowerCase().includes(tvgName.toLowerCase())
  );

  res.json(resultados); // Retorna os resultados como JSON
});








app.listen(3000, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
