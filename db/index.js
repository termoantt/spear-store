const env = require('../config/env');

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
const connectionUS = new Connection(dbUS);
const connectionAsia = new Connection(dbAsia);

connectionEurope.on("connect", err => {
    connectionMessage(dbEurope, err)
});
connectionUS.on("connect", err => {
    connectionMessage(dbUS, err)
});
connectionAsia.on("connect", err => {
    connectionMessage(dbAsia, err)
});

module.exports = {
    connectionEurope,
    connectionUS,
    connectionAsia
}