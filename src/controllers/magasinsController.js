const { Magasins, Parcs } = require("../db/sequelize");

exports.getAllMagasins = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Magasins.findAll({
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
    Magasins.findAll()
      .then((rest) => {
        res.json(rest);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

exports.createMagasins = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer une attraction";
    return res.status(401).json({ message });
  }

  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path;
  }

  const ref_parc = req.body.ref_parc;
  Magasins.findOne({
    where: {
      id: ref_parc,
    },
  })
    .then((attr) => {
      if (attr) {
        res.status(500).json({ message: "Magasins déjà existante" });
      } else {
        Magasins.create({
          name: req.body.name,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          beginHour: req.body.beginHour,
          endHour: req.body.endHour,
          img_url: imagePath,
          description: req.body.description,
          ref_parc: ref_parc,
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

exports.deleteMagasins = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour supprimer un Magasins";
    return res.status(401).json({ message });
  }

  const id = req.params.id;

  Magasins.destroy({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      res.status(200).json({ message: "Magasins supprimé" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
