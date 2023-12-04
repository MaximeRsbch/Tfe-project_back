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

  const id = req.body.id;
  const name = req.body.name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const beginHour = req.body.beginHour;
  const endHour = req.body.endHour;
  const img_url = req.body.img_url;
  const description = req.body.description;
  const is_open = req.body.is_open;

  const parc = req.body.parc;

  Restaurant.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (attr) {
        res.status(500).json({ message: "Restaurant déjà existante" });
      } else {
        Restaurant.create({
          id: id,
          nom: name,
          latitude: latitude,
          longitude: longitude,
          beginHour: beginHour,
          endHour: endHour,
          img_url: img_url,
          description: description,
          is_open: is_open,
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
