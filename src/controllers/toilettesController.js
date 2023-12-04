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

  const id = req.body.id;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  const parc = req.body.parc;

  Toilettes.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (attr) {
        res.status(500).json({ message: "Toilettes déjà existante" });
      } else {
        Toilettes.create({
          id: id,
          latitude: latitude,
          longitude: longitude,
          ref_parc: parc,
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
