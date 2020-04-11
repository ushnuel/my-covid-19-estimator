/* eslint-disable no-console */
const xml = require('xml2js');
const CovidEstimator = require('./estimator');

const builder = new xml.Builder({
  renderOpts: { pretty: false }
});

const estimateValue = (data) => CovidEstimator(data);

const estimatorController = {
  estimate(req, res, next) {
    try {
      console.log('request', req.body);
      const estimatedValues = estimateValue(req.body);
      res.status(200).json({ data: estimatedValues });
    } catch (error) {
      next(error);
    }
  },

  estimateXml(req, res, next) {
    try {
      const estimatedValues = estimateValue(req.body);
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(builder.buildObject({ Root: estimatedValues }));
    } catch (error) {
      next(error);
    }
  }
};

module.exports = estimatorController;
