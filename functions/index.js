const functions = require('firebase-functions');

exports.customers = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!s");
});
