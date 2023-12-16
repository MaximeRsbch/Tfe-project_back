const { Restaurant, Parcs } = require("../db/sequelize");

exports.getAllRestaurants = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Restaurant.findAll({
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
    Restaurant.findAll()
      .then((rest) => {
        res.json(rest);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

exports.createRestaurant = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer une attraction";
    return res.status(401).json({ message });
  }

  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path;
  }

  Restaurant.create({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    beginHour: req.body.beginHour,
    endHour: req.body.endHour,
    carte_img: imagePath,
    description: req.body.description,
    ref_parc: req.body.ref_parc,
  })
    .then((attr) => {
      res.status(201).json(attr);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.deleteRestaurant = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour supprimer un restaurant";
    return res.status(401).json({ message });
  }

  const id = req.params.id;

  Restaurant.destroy({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      res.status(200).json({ message: "Restaurant supprimé" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
