const Postback = require("./Postback");
const PostbackLog = require("./PostbackLog");

module.exports = {
  Postback: new Postback(),
  PostbackLog: new PostbackLog(),
};
