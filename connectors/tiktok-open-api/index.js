const axios = require("axios");

const pixelTrack = async ({
  pixel_code,
  event,
  time_created_at,
  payload: data,
  reference_code,
  access_token,
}) => {
  const payload = Object.assign({
    pixel_code,
    event,
    timestamp: time_created_at,
    context: {
      ad: {
        callback: reference_code,
      },
    },
  }, JSON.parse(data));
  return axios.post("https://business-api.tiktok.com/open_api/v1.2/pixel/track/", payload, {
    headers: {
      "Content-Type": "application/json",
      "Access-Token": access_token,
    },
  })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        logError(error);
        return false;
      });
};

module.exports = {
  pixelTrack,
};
