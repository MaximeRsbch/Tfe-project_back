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

  const id = req.body.id;
  const name = req.body.name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const beginHour = req.body.beginHour;
  const endHour = req.body.endHour;
  const img_url = req.body.img_url;
  const description = req.body.description;

  const parc = req.body.parc;

  Magasins.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (attr) {
        res.status(500).json({ message: "Magasins déjà existante" });
      } else {
        Magasins.create({
          id: id,
          nom: name,
          latitude: latitude,
          longitude: longitude,
          beginHour: beginHour,
          endHour: endHour,
          img_url: img_url,
          description: description,

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
