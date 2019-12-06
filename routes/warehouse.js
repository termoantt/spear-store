const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouse/warehouse');

router.get('/',
    warehouseController.getWarehouse
);

module.exports = router;
