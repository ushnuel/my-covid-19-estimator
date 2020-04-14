/* eslint-disable no-unused-vars */
const xml = require('xml2js');
const CovidEstimator = require('./estimator');

const builder = new xml.Builder({
  renderOpts: { pretty: false }
});

const estimateValue = (data) => CovidEstimator(data);

const estimatorController = {
  estimate(req, res, next) {
    const estimatedValues = estimateValue(req.body);
    res.status(200).json({ ...estimatedValues });
    return estimatedValues;
  },

  estimateXml(req, res, next) {
    const estimatedValues = estimateValue(req.body);
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(builder.buildObject({ Root: estimatedValues }));
    return estimatedValues;
  }
};

module.exports = estimatorController;
