const axios = require("axios");
const url = require("url");

exports.mapboxSearch = async (req, res) => {
  try {
    const params = new URLSearchParams({
      access_token:
        "pk.eyJ1IjoibWF4aW1lcnNiY2giLCJhIjoiY2xpcDM3OG50MDRwaDNybXhkYzMydmFpbiJ9.wRp_KXMbjtUtozX73p23gQ",
      ...url.parse(req.url, true).query,
    });
    console.log(params);
    const query = req.params.query;
    const results = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
    );

    results.data.features.forEach((item) => {
      item.city = null;
      item.state = null;

      item.context.forEach((type) => {
        if (type.id.includes("place")) {
          item.city = type.text;
        }
        if (type.id.includes("region")) {
          item.state = type.text;
        }
      });
    });
    const data = results.data;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
