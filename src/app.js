require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();

const morganOpt = NODE_ENV === 'production' ? 'tiny' : 'common';

  app.use(morgan(morganOpt));
  app.use(cors());
  app.use(helmet());

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
      response = { error: {message: 'Server error'} };
    } else {
      console.error(error)
      respons = { message: error.message,  error }
    }
    res.status(500).json(response);
  });

  module.exports = app;