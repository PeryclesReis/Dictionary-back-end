const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  return res.status(200).send({ message: 'Fullstack Challenge 🏅 - Dictionary' });
});

app.use('/auth', router);
app.use('/user', router);
app.use('/entries', router);

app.use((err, _req, res, _next) => {
  console.log(err.message);
  return res.status(500).json({ message: 'Deu ruim alguma coisa aqui!'});
});

module.exports = app;
