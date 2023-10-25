const axios = require("axios");
const {
  Parcs,
  Attraction,
  imgAttr,
  Review,
  CommentAttr,
} = require("../db/sequelize");

exports.getParksWithQueueTime = async (req, res) => {
  try {
    const response = await axios.get(`https://queue-times.com/fr/parks.json`);
    const parksList = response.data.map((entry) => entry.parks).flat();

    res.status(200).json(parksList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getPark = async (req, res) => {
  const id = req.params.id;

  if (id) {
    getUniquePark(id, res);
  } else {
    getAllParks(res);
  }
};

const getAllParks = async (res) => {
  try {
    const parks = await Parcs.findAll();
    res.status(200).json(parks);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getUniquePark = async (id, res) => {
  try {
    Parcs.findByPk(id, {
      include: [
        {
          model: Attraction,
          include: [
            {
              model: imgAttr,
            },
            {
              model: Review,
            },
            {
              model: CommentAttr,
            },
          ],
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
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createPark = async (req, res) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer un parc";
    return res.status(401).json({ message });
  }
  const id = req.body.id;
  const nom = req.body.nom;
  const beginHour = req.body.beginHour;
  const endHour = req.body.endHour;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const ticketPrice = req.body.ticketPrice;

  if (!id) {
    res.status(500).json({ message: "Veuillez remplir l'id" });
  } else {
    try {
      await Parcs.create({
        id,
        nom,
        beginHour,
        endHour,
        latitude,
        longitude,
        ticketPrice,
      });
      res.status(200).json({ message: "Succès" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
};

exports.updatePark = async (req, res) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour update un parc";
    return res.status(401).json({ message });
  }
  const nom = req.body.nom;
  const beginHour = req.body.beginHour;
  const endHour = req.body.endHour;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const ticketPrice = req.body.ticketPrice;

  const id = req.body.id;

  try {
    await Parcs.update(
      {
        nom,
        beginHour,
        endHour,
        latitude,
        longitude,
        ticketPrice,
      },
      { where: { id } }
    );
    res.status(200).json({ message: "Succès" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deletePark = async (req, res) => {
  const id = req.params.id;

  try {
    await Parcs.destroy({ where: { id } });
    res.status(200).json({ message: "Succès" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getAllInformations = async (req, res) => {
  Parcs.findAll({
    include: [
      {
        model: Attraction,
        include: [
          {
            model: imgAttr,
          },
          {
            model: Review,
          },
          {
            model: CommentAttr,
          },
        ],
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
};

exports.getOnePark = async (req, res) => {
  const id = req.params.id;

  Parcs.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      const message = "Le parc a bien été trouvé";
      return res.json({ message, data: user });
    })
    .catch((error) => {
      const message =
        "Le parc n'a pas pu être trouvé. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};

exports.getAllParcs = async (req, res) => {
  Parcs.findAll()
    .then((users) => {
      const message = "La liste des parcs a bien été récupérée";
      return res.json({ message, data: users });
    })
    .catch((error) => {
      const message =
        "La liste des parcs n'a pas pu être récupérée. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};
