/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const xml = require('xml2js');
const fs = require('fs');
const CovidEstimator = require('./estimator');

const builder = new xml.Builder({
  renderOpts: { pretty: false }
});

const estimateValue = (data) => CovidEstimator(data);

const logResponse = (res) => {
  fs.readFile('logs.log', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
    }
  });
};

const estimatorController = {
  estimate(req, res, next) {
    const estimatedValues = estimateValue(req.body);
    res.status(200).json({ ...estimatedValues });
  },

  estimateXml(req, res, next) {
    const estimatedValues = estimateValue(req.body);
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(builder.buildObject({ Root: estimatedValues }));
  },

  logs(req, res, next) {
    res.setHeader('Content-Type', 'plain/text');
    logResponse(res);
  }
};

module.exports = estimatorController;
