const { Favoris } = require("../db/sequelize.js");

exports.getAllFavoris = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Favoris.findAll({ where: { ref_user: id } })
      .then((favoris) => {
        const message = "La liste des favoris a été récupérée avec succès";
        return res.json({ message, data: favoris });
      })
      .catch((error) => {
        const message =
          "La liste des favoris n'a pas pu être récupérée. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  } else {
    Favoris.findAll()
      .then((favoris) => {
        const message = "La liste des favoris a été récupérée avec succès";
        return res.json({ message, data: favoris });
      })
      .catch((error) => {
        const message =
          "La liste des favoris n'a pas pu être récupérée. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  }
};

exports.createFavoris = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer un favoris";
    return res.status(401).json({ message });
  }

  const ref_user = req.body.ref_user;
  const ref_attraction = req.body.ref_attraction;

  Favoris.create({
    ref_user,
    ref_attraction,
  })
    .then((favoris) => {
      const message = "Le favoris a été créé avec succès";
      return res.json({ message, data: favoris });
    })
    .catch((error) => {
      const message =
        "Le favoris n'a pas pu être créé. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};
