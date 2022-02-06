const {PostbackLog} = require("../connectors/db");
const {logInfo, logWarn} = require("../logger");
const {pixelTrack} = require("../workers");
const {v4: uuidv4} = require("uuid");

const handler = async (req, res) => {
  const {
    params: {postbackId},
    query: {ttclid, value, currency},
  } = req;

  if (!postbackId || !ttclid) {
    logWarn(`[RECEIVED] INCORECT PAYLOAD ${postbackId}`, {
      data: JSON.stringify({
        params: {postbackId},
        query: {ttclid, value, currency},
      }),
    });
    return res.json({status: "INCORECT PAYLOAD"});
  }

  const payload = JSON.stringify({value: value || 0, currency: currency || "USD"});
  const batch_id = uuidv4();
  const postbackLogData = {
    batch_id,
    reference_id: postbackId,
    reference_code: ttclid,
    payload: payload,
    status: "RECEIVED",
  };
  const log = await PostbackLog.insert(postbackLogData);
  logInfo(`[RECEIVED]: POSTBACK ${postbackId} WITH TTCLID ${ttclid}`, {log_id: log._id, batch_id});
  pixelTrack.push(postbackLogData);
  res.json({status: "OK", batch_id, log_id: log._id});
};

module.exports = handler;
