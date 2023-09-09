const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const server = express();
const filmes = require('./src/data/filmes.json')


server.get('/filmes', (req,res) => {


    return res.json(filmes)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
