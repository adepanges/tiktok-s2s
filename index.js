const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();

const app = express();
app.use(cors({origin: true}));

const {logError, logInfo} = require("./logger");
const {Postback} = require("./connectors/db");

const {
  createHandler,
  errorHandler,
} = require("./libs");
const receivePostback = require("./handler/receivePostback");

app.get("/:postbackId", createHandler(receivePostback));
app.use(errorHandler);

(async () => {
  try {
    const {count, data} = await Postback.findAll();
    logInfo("[LISTEN] POSTBACK", {data});
    logInfo(`[LISTEN] TOTAL ${count} POSTBACK`);
  } catch (err) {
    logError(err);
  }
})();


exports.postback = functions.https.onRequest(app);
