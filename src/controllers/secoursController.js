const { Secours } = require("../db/sequelize");

exports.addSecours = async (req, res) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer une attraction";
    return res.status(401).json({ message });
  }

  const ref_parc = req.body.ref_parc;
  Secours.findOne({
    where: {
      id: ref_parc,
    },
  })
    .then((attr) => {
      if (attr) {
        res.status(500).json({ message: "Secours déjà existante" });
      } else {
        Secours.create({
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

exports.deleteSecours = async (req, res) => {
  const id = req.params.id;

  Secours.destroy({
    where: {
      id: id,
    },
  })
    .then((secours) => {
      res.status(201).json(secours);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.updateSecours = async (req, res) => {
  const id = req.params.id;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const ref_parc = req.body.ref_parc;

  Secours.update(
    {
      latitude: latitude,
      longitude: longitude,
      ref_parc: ref_parc,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((secours) => {
      res.status(201).json(secours);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.getSecours = async (req, res) => {
  const id = req.params.id;
  if (id) {
    Secours.findAll({ where: { ref_parc: id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err.message });
      });
  } else {
    Secours.findAll()
      .then((attr) => {
        res.json(attr);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};
