const { Info } = require("../db/sequelize.js");

exports.getAllInfo = (req, res, next) => {
  const id = req.params.id;
  if (id) {
    Info.findAll({ where: { ref_parc: id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err.message });
      });
  } else {
    Info.findAll()
      .then((attr) => {
        res.json(attr);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

exports.createInfo = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer une attraction";
    return res.status(401).json({ message });
  }

  const ref_parc = req.body.ref_parc;
  Info.findOne({
    where: {
      id: ref_parc,
    },
  })
    .then((attr) => {
      if (attr) {
        res.status(500).json({ message: "Info déjà existante" });
      } else {
        Info.create({
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
