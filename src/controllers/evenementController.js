const { Evenement } = require("../db/sequelize.js");

exports.getAllEvents = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Evenement.findAll({ where: { ref_parc: id } })
      .then((events) => {
        const message = "La liste des événements a été récupérée avec succès";
        return res.json({ message, data: events });
      })
      .catch((error) => {
        const message =
          "La liste des événements n'a pas pu être récupérée. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  } else {
    Evenement.findAll()
      .then((events) => {
        const message = "La liste des événements a été récupérée avec succès";
        return res.json({ message, data: events });
      })
      .catch((error) => {
        const message =
          "La liste des événements n'a pas pu être récupérée. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  }
};

exports.createEvents = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer une attraction";
    return res.status(401).json({ message });
  }

  const title = req.body.title;
  const description = req.body.description;

  const ref_parc = req.body.ref_parc;

  Evenement.create({
    title,
    description,
    ref_parc,
  })
    .then((event) => {
      const message = "L'événement a été créé avec succès";
      return res.json({ message, data: event });
    })
    .catch((error) => {
      const message =
        "L'événement n'a pas pu être créé. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};
