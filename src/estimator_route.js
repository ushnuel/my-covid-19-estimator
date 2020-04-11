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

router.post('/', EstimateController.estimate);
router.post('/json', EstimateController.estimate);
router.post('/xml', xmlParser(xmlOPtions), EstimateController.estimateXml);

module.exports = router;
