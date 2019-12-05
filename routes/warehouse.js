var express = require('express');
var router = express.Router();

const warehouseController = require('../controllers/warehouse/warehouse');

router.get('/',
    warehouseController.getWarehouse
);

module.exports = router;
