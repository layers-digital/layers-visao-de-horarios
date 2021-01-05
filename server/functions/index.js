const functions = require('firebase-functions');
const Sentry = require('@sentry/node')

// Initialize Sentry
Sentry.init({
  dsn: functions.config().sentry.dsn,
  environment: functions.config().sentry.env,
  attachStacktrace: true,
})

const api = require('./api');
exports.api = functions.https.onRequest(api);