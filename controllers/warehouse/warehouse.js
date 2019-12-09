const { Request } = require('tedious')
const { connectionEurope, connectionUS, connectionAsia } = require('../../db');

const getWarehouse = function (req, res, next) {
    let jsonArray = [];
    const region = req.params.region;

    const request = new Request(
        `SELECT * FROM [Warehouse]`,
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
            connectionAsia.execSql(request);
            break;
        case 'America':
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