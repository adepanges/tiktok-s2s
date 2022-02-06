"use strict";

const {Postback, PostbackLog} = require("../connectors/db");
const tiktokOpenApi = require("../connectors/tiktok-open-api");
const {logInfo, logWarn, logError} = require("../logger");

const worker = async (data, done) => {
  let postback;
  try {
    postback = await Postback.findById(data.reference_id);
  } catch (error) {
    logError(error);
    done(error);
  }
  if (!postback) return logWarn(`[NOT VALID POSTBACK] ${reference_id}`);

  let result;
  try {
    result = await tiktokOpenApi.pixelTrack(Object.assign(postback, data));
  } catch (error) {
    logError(error);
    done(error);
  }

  if (result) {
    if (result.message == "OK") {
      const log = await PostbackLog.insert(Object.assign(data, {
        status: "PROCESSED",
        response: JSON.stringify(result),
      }));
      logInfo(`[PROCESSED]: POSTBACK ${data.reference_id} WITH TTCLID ${data.reference_code}`, {log_id: log._id, batch_id: data.batch_id});
    }
    done(null, `Done ${postback._id}`);
  }
};

const pixelTrack = require("fastq")(worker, 1);

module.exports = pixelTrack;
