const { Modo } = require("../db/sequelize.js");

exports.createModo = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer un modo";
    return res.status(401).json({ message });
  }
  Modo.create({
    username: req.body.username,
    email: req.body.email,
    ref_user: req.body.ref_user,
    ref_parc: req.body.ref_parc,
  })
    .then((modo) => {
      const message = "Le modo a été créé avec succès";
      return res.json({ message, data: modo });
    })
    .catch((e) => {
      const message =
        "Le modo n'a pas pu être créé. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: e });
    });
};

exports.deleteModo = (req, res, next) => {
  if (req.userRole !== "admin") {
    const message = "Vous n'avez pas les droits pour supprimer un modo";
    return res.status(401).json({ message });
  } else {
    Modo.destroy({ where: { id: req.params.id } })
      .then((modo) => {
        const message = "Le modo a été supprimé avec succès";
        return res.json({ message });
      })
      .catch((error) => {
        const message =
          "Le modo n'a pas pu être supprimé. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  }
};

exports.getAllModos = (req, res, next) => {
  Modo.findAll()
    .then((modo) => {
      const message = "Les modos ont bien été trouvés";
      return res.json({ message, data: modo });
    })
    .catch((error) => {
      const message =
        "Les modos n'ont pas pu être récupérés. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: error });
    });
};

exports.getAllModosByParc = (req, res, next) => {
  Modo.findAll({ where: { ref_parc: req.params.id } })
    .then((modo) => {
      const message = "Les modos ont bien été trouvés";
      return res.json({ message, data: modo });
    })
    .catch((error) => {
      const message =
        "Les modos n'ont pas pu être récupérés. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: error });
    });
};
