const Database = require("./Database");

class Postback extends Database {
  constructor() {
    super("postbacks");
  }
}

module.exports = Postback;
