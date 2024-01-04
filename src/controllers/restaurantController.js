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

exports.getOneRestaurant = (req, res, next) => {
  const id = req.params.id;

  Restaurant.findOne({
    where: {
      id: id,
    },
  })
    .then((user) => {
      const message = "Le resto a bien été trouvé";
      return res.json({ message, data: user });
    })
    .catch((error) => {
      const message =
        "Le resto n'a pas pu être trouvé. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
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
    url_carte: req.body.url_carte,
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

exports.updateRestaurant = async (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour update un parc";
    return res.status(401).json({ message });
  }

  const name = req.body.name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const beginHour = req.body.beginHour;
  const endHour = req.body.endHour;
  const description = req.body.description;

  const id = req.body.id;

  try {
    await Restaurant.update(
      {
        name,
        latitude,
        longitude,
        beginHour,
        endHour,
        description,
      },
      { where: { id } }
    );
    res.status(200).json({ message: "Succès", data: req.body });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
