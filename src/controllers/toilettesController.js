const { Parcs, Toilettes } = require("../db/sequelize");

exports.getAllToilettes = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Toilettes.findAll({
      where: {
        ref_parc: id,
      },
      include: [
        {
          model: Parcs,
        },
      ],
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err.message });
      });
  } else {
    Toilettes.findAll()
      .then((rest) => {
        res.json(rest);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

exports.createToilettes = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer une attraction";
    return res.status(401).json({ message });
  }

  const ref_parc = req.body.ref_parc;
  Toilettes.findOne({
    where: {
      id: ref_parc,
    },
  })
    .then((attr) => {
      if (attr) {
        res.status(500).json({ message: "Toilettes déjà existante" });
      } else {
        Toilettes.create({
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          ref_parc: req.body.ref_parc,
        })
          .then((attr) => {
            res.status(201).json(attr);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
      console.log(error);
    });
};

exports.deleteToilettes = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour supprimer un Toilettes";
    return res.status(401).json({ message });
  }

  const id = req.params.id;

  Toilettes.destroy({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      res.status(200).json({ message: "Toilettes supprimée" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
