const axios = require("axios");

exports.queuetime = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(
      `https://queue-times.com/fr/parks/${id}/queue_times.json`
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
