const env = require('../../config/env');

const { Connection, Request } = require('tedious');

const connectionMessage = function (location, err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`Connected to database ${location.server}`);
    }
};

const dbEurope = env.DB.EUROPE;
const dbUS = env.DB.US;
const dbAsia = env.DB.ASIA;

const connectionEurope = new Connection(dbEurope);
// const connectionUS = new Connection(dbUS);
// const connectionAsia = new Connection(dbAsia);

connectionEurope.on("connect", err => {
    connectionMessage(dbEurope, err)
});
// connectionUS.on("connect", err => {
//     connectionMessage(dbUS, err)
// });
// connectionAsia.on("connect", err => {
//     connectionMessage(dbAsia, err)
// });

const getWarehouse = function (req, res, next) {
    let jsonArray = [];

    const request = new Request(
        `SELECT * FROM [Product]`,
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

    console.log(req.ip);
    connectionEurope.execSql(request);
};

module.exports = {
    getWarehouse
}