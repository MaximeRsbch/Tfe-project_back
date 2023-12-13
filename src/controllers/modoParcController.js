const { ModoParc } = require("../db/sequelize.js");

exports.createModoParc = (req, res, next) => {
  if (req.userRole !== "admin") {
    const message = "Vous n'avez pas les droits pour créer un modoParc";
    return res.status(401).json({ message });
  }
  ModoParc.create({
    username: req.body.username,
    email: req.body.email,
    ref_user: req.body.ref_user,
    ref_parc: req.body.ref_parc,
  })
    .then((modoParc) => {
      const message = "Le modoParc a été créé avec succès";
      return res.json({ message, data: modoParc });
    })
    .catch((e) => {
      const message =
        "Le modoParc n'a pas pu être créé. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: e });
    });
};

exports.deleteModoParc = (req, res, next) => {
  if (req.userRole !== "admin") {
    const message = "Vous n'avez pas les droits pour supprimer un modoParc";
    return res.status(401).json({ message });
  } else {
    ModoParc.destroy({ where: { id: req.params.id } })
      .then((modoParc) => {
        const message = "Le modoParc a été supprimé avec succès";
        return res.json({ message });
      })
      .catch((error) => {
        const message =
          "Le modoParc n'a pas pu être supprimé. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  }
};

exports.getAllModoParcs = (req, res, next) => {
  ModoParc.findAll()
    .then((modoParcs) => {
      const message = "La liste des modoParcs a bien été récupérée";
      return res.json({ message, data: modoParcs });
    })
    .catch((e) => {
      const message =
        "La liste des modoParcs n'a pas pu être récupérée. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: e });
    });
};

exports.getAllModoParcsByParc = (req, res, next) => {
  ModoParc.findAll({ where: { ref_parc: req.params.id } })
    .then((modoParcs) => {
      const message = "La liste des modoParcs a bien été récupérée";
      return res.json({ message, data: modoParcs });
    })
    .catch((e) => {
      const message =
        "La liste des modoParcs n'a pas pu être récupérée. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: e });
    });
};
