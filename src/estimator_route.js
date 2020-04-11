const express = require('express');
const xmlParser = require('express-xml-bodyparser');

const EstimateController = require('./estimator_controller');

const router = express.Router();
const xmlOPtions = {
  charkey: 'value',
  trim: false,
  explicitRoot: false,
  explicitArray: false,
  normalizeTags: false,
  mergeAttrs: true
};

router.post('/on-covid-19', EstimateController.estimate);
router.post('/on-covid-19/json', EstimateController.estimate);
router.post(
  '/on-covid-19/xml',
  xmlParser(xmlOPtions),
  EstimateController.estimateXml
);

module.exports = router;
