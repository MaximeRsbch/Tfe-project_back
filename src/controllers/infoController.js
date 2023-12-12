const { Info } = require("../db/sequelize.js");

exports.getAllInfo = (req, res, next) => {
  const id = req.params.id;
  if (id) {
    Info.findAll({ where: { ref_parc: id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err.message });
      });
  } else {
    Info.findAll()
      .then((attr) => {
        res.json(attr);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

exports.createInfo = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer une info";
    return res.status(401).json({ message });
  }

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const ref_parc = req.body.ref_parc;

  Info.create({
    latitude: latitude,
    longitude: longitude,
    ref_parc: ref_parc,
  })
    .then((info) => {
      const message = "L'info a été créée avec succès";
      return res.json({ message, data: info });
    })
    .catch((error) => {
      const message =
        "L'info n'a pas pu être créée. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};
