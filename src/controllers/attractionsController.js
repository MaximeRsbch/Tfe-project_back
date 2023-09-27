const { Attraction } = require("../db/sequelize.js");
const axios = require("axios");

exports.findAttractionQueueTime = (req, res, next) => {
  const id = req.params.id;

  axios
    .get(`https://queue-times.com/parks/${id}/queue_times.json`)
    .then((response) => {
      let attrList = null;
      if (response.data.rides.length > 0) {
        attrList = response.data.rides;
        res.status(200).json(attrList);
      } else if (response.data.lands) {
        attrList = response.data.lands.rides;
        res.status(200).json(attrList);
      }
    });
};
