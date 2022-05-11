const response = require('./response')
const Sentry = require("@sentry/node");
const config  = require("../config");

Sentry.init({ 
    dsn: `https://${config.sentry.dns}.ingest.sentry.io/${config.sentry.id}`, 
      // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    });

function errors(err, req, res, next){
    Sentry.captureException(err);
    console.error(err.stack);
    next(err);

    console.log('[error]', err)

    const message = err.message || 'Error interno'
    const status = err.statusCode || 500

    response.error(req, res, message, status)
}


module.exports = errors