const functions = require('firebase-functions');

const relatedAPI = require('./apis/relatedAPI');

// Expose Express API as a single Cloud Function:
exports.related = functions.https.onRequest(relatedAPI);