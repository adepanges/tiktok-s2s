const {
  info: logInfo,
  error: logError,
  warn: logWarn,
} = require("firebase-functions/lib/logger");

module.exports = {logInfo, logError, logWarn};
