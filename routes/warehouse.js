const express = require('express');
const router = express.Router();

const warehouseController = require('../controllers/warehouse/warehouse');

router.get('/',
    warehouseController.getWarehouse
);

router.get('/:region',
    warehouseController.getWarehouse
);

router.post('/:region/buy',
    warehouseController.buyGuitar
);

module.exports = router;
