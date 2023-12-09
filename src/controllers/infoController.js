const { Info } = require("../db/sequelize.js");

exports.getAllInfo = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Info.findAll({ where: { ref_user: id } })
      .then((info) => {
        const message = "La liste des infos a été récupérée avec succès";
        return res.json({ message, data: info });
      })
      .catch((error) => {
        const message =
          "La liste des infos n'a pas pu être récupérée. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  } else {
    Info.findAll()
      .then((info) => {
        const message = "La liste des infos a été récupérée avec succès";
        return res.json({ message, data: info });
      })
      .catch((error) => {
        const message =
          "La liste des infos n'a pas pu être récupérée. Réessayez dans quelques instants";
        return res.json({ message, data: error });
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
