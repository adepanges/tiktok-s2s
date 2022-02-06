const Database = require("./Database");

class Log extends Database {
  constructor() {
    super("postback_logs");
  }
}

module.exports = Log;
