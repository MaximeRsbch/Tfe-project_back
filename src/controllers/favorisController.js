const { Favoris, Attraction } = require("../db/sequelize.js");

exports.getAllFavoris = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Favoris.findAll({ where: { ref_user: id }, include: Attraction })
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
  Favoris.findOne({
    where: {
      ref_user: req.body.ref_user,
      ref_attraction: req.body.ref_attraction,
    },
  }).then((favoris) => {
    if (favoris) {
      const message = "L'article a déjà été ajouté aux favoris";
      return res.status(401).json({ message });
    } else {
      Favoris.create({
        ref_user: req.body.ref_user,
        ref_attraction: req.body.ref_attraction,
      })
        .then((favoris) => {
          const message = "L'article a été créé avec succès";
          return res.json({ message, data: favoris });
        })
        .catch((e) => {
          const message =
            "L'article n'a pas pu être créé. Réessayez dans quelques instants";
          return res.status(500).json({ message, data: e });
        });
    }
  });
};

exports.deleteFavoris = (req, res, next) => {
  const id = req.params.id;

  Favoris.destroy({ where: { id: id } })
    .then((favoris) => {
      const message = "Le favoris a été supprimé avec succès";
      return res.json({ message, data: favoris });
    })
    .catch((error) => {
      const message =
        "Le favoris n'a pas pu être supprimé. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};

exports.deleteAllFavoris = (req, res, next) => {
  const id = req.body.id;

  Favoris.destroy({ where: { ref_attraction: id } })
    .then((favoris) => {
      const message = "Le favoris a été supprimé avec succès";
      return res.json({ message, data: favoris });
    })
    .catch((error) => {
      const message =
        "Le favoris n'a pas pu être supprimé. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};
