const express = require('express');

const stockController = require('../controllers/stock');

const router = express.Router();

router.post('/stock-data', stockController.getStockData);

module.exports = router;