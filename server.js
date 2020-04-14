/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const router = require('./src/estimator_route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
  morgan(':method\t\t:url\t\t:status\t\t0:total-time[0]ms', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs.log'), {
      flags: 'a'
    })
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'accept', 'content-type');
  next();
});
app.use('/api/v1/on-covid-19', router);
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my covid-19 estimator api'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT', PORT);
});

module.exports = app;
