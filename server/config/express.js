const express = require('express');
const path = require('path');
const config = require('../config');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');
const passport = require('passport');
const morgan = require('morgan')

const app = express();
//parsing body from api
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.env === 'dev') {
  app.use(morgan('dev'))
}

//get dist folder
const distDir = path.join(__dirname, '../../dist');

//use dist folder as hosting folder by express
app.use(express.static(distDir));


//secure app http
app.use(helmet());

//allow cors
app.use(cors());

//authenticate
app.use(passport.initialize());

//api router //localhost:4050/api
app.use('/api/v1', routes);

// image
app.use('/image', express.static(path.join(__dirname, '../images')))

//serve the index.html
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../dist/index.html')));

app.use(function (err, req, res, next) {
  console.error('[ERROR HANDLER]', {err})
  res.status(500).send(err instanceof Error ? err.message : 'Something broke!')
})

module.exports = app;
