/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const router = require('./src/estimator_route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'accept', 'content-type');
  next();
});
app.use('/api/v1', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT', PORT);
});

module.exports = app;
