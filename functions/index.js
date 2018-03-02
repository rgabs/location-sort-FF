const functions = require('firebase-functions');
const Utils = require('./utils');

exports.customers = functions.https.onRequest((request, response) => {
    const officeLocation = { latitude: 53.339428, longitude: -6.257664 };
    return Utils.getAllCustomers()
        .then(customers => Utils.filterByDistance(customers, officeLocation))
        .then((customers) => response.send(customers))
        .catch((e) => response.status(500).send(e))
    }
);
