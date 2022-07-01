const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

const { notFound, errorHandler } = require('./middlewares');

const app = express();

const corsOptions = {
  origin: ['*'],
  credentials: true,
  optionsSuccessStatus: 200
}

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

const livros = require('./routes/livros');

app.use('/livros', livros);

app.use(notFound);
app.use(errorHandler);

module.exports = app;