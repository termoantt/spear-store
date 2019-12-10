const { Request } = require('tedious')
const { connectionEurope, connectionUS, connectionAsia } = require('../../db');

const getConnection = function (region) {
    switch (region) {
        case 'Asia':
        case 'Australia':
            return connectionAsia;
        case 'America':
        case 'North America':
        case 'South America':
            return connectionUS;
        case 'Europe':
        default:
            return connectionEurope;
    }
};

const getWarehouse = function (req, res, next) {
    let jsonArray = [];
    const connection = getConnection(req.params.region);

    const request = new Request(
        'SELECT * FROM Product INNER JOIN Warehouse ON Product.product_id=Warehouse.product_id;',
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

    connection.execSql(request);
};

const buyGuitar = function (req, res, next) {
    const connection = getConnection(req.params.region);

    const orderRequest = new Request(
        `SELECT order_id FROM Orders;`,
        (err, rowCount, rows) => {
            if (err) {
                console.error(err.message);
                res.send({ status: 500, data: null, message: "Internal server error." });
            } else {
                connection.execSql(new Request(
                    `INSERT INTO Orders (order_id, user_id, is_payed, country, postal_code, post_office, street_address, street_number)
                    VALUES (${rowCount}, 1, 0, 'Finland', '53850', 'Lappeenranta', 'Yliopistonkatu', 34);
                    INSERT INTO Order_has_product (order_id, product_id, order_count)
                    VALUES (${rowCount}, ${req.body.product_id}, 1);
                    SELECT * FROM Orders WHERE order_id=${rowCount};`,
                    (err, rowCount, rows) => {
                        if (err) {
                            console.error(err.message);
                            res.send({ status: 500, data: null, message: "Internal server error." });
                        } else {
                            res.send({ status: 200, data: rows, message: "OK" });
                        }
                    }
                ));
            }
        }
    );

    const updateRequest = new Request(
        `UPDATE Warehouse SET stock_level = ${req.body.quantity} WHERE product_id = ${req.body.product_id};`,
        (err, rowCount, rows) => {
            if (err) {
                console.error(err.message);
                res.send({ status: 500, data: null, message: "Internal server error." });
            } else {
                connection.execSql(orderRequest);
            }
        }
    );

    connection.execSql(updateRequest);
};

module.exports = {
    getWarehouse,
    buyGuitar
}