const { Request } = require('tedious')
const { connectionEurope, connectionUS, connectionAsia } = require('../../db');

const getWarehouse = function (req, res, next) {
    let jsonArray = [];
    const region = req.params.region;

    const request = new Request(
        `SELECT Product.brand, Product.model, Product.scale, Product.weight, Product.price, Warehouse.stock_level 
        FROM Product
        INNER JOIN Warehouse ON Product.product_id=Warehouse.product_id;`,
        (err, rowCount) => {
            if (err) {
                console.error(err.message);
                res.send({ status: 500, data: null, message: "Internal server error." });
            } else {
                res.send({ status: 200, data: jsonArray, message: "OK" });
            }
        }
    );

    request.on("row", columns => {
        let rowObject = {};
        columns.forEach(column => {
            rowObject[column.metadata.colName] = column.value;
        });
        jsonArray.push(rowObject);
    });

    switch (region) {
        case 'Asia':
        case 'Australia':
            connectionAsia.execSql(request);
            break;
        case 'America':
        case 'North America':
        case 'South America':
            connectionUS.execSql(request);
            break;
        case 'Europe':
        default:
            connectionEurope.execSql(request);
            break;
    }
};

module.exports = {
    getWarehouse
}