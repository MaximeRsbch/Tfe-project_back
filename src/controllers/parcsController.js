const axios = require("axios");
const {
  Parcs,
  Attraction,
  imgAttr,
  Review,
  CommentAttr,
  Restaurant,
  Toilettes,
  Magasins,
  Evenement,
  Secours,
  Info,
  ParcsCalendar,
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

  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path;
  }

  const id = req.body.id;
  const nom = req.body.nom;
  const beginHour = req.body.beginHour;
  const endHour = req.body.endHour;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const ticketPrice = req.body.ticketPrice;
  const img_url = imagePath;
  const legende = req.body.legende;

  const showWC = req.body.showWC;
  const showResto = req.body.showResto;
  const showMagasins = req.body.showMagasins;
  const showCommentArticle = req.body.showCommentArticle;

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
        img_url,
        legende,
        showWC,
        showResto,
        showMagasins,
        showCommentArticle,
      }).then((data) => {
        res.status(200).json({ message: "Succès", data });
      });
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
  const legende = req.body.legende;

  const showWC = req.body.showWC;
  const showResto = req.body.showResto;
  const showMagasins = req.body.showMagasins;
  const showCommentArticle = req.body.showCommentArticle;

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
        legende,
        showWC,
        showResto,
        showMagasins,
        showCommentArticle,
      },
      { where: { id } }
    );
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
      {
        model: Restaurant,
      },
      {
        model: Toilettes,
      },
      {
        model: Magasins,
      },
      {
        model: Evenement,
      },
      {
        model: Secours,
      },
      {
        model: Info,
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
    .then((parcs) => {
      const message = "La liste des parcs a bien été récupérée";
      return res.json({ message, data: parcs });
    })
    .catch((error) => {
      const message =
        "La liste des parcs n'a pas pu être récupérée. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};

exports.createCalendar = async (req, res) => {
  const date = req.body.date;
  const beginHour = req.body.beginHour;
  const endHour = req.body.endHour;
  const ref_parc = req.body.ref_parc;

  try {
    await ParcsCalendar.create({
      date,
      beginHour,
      endHour,
      ref_parc,
    }).then((data) => {
      res.status(200).json({ message: "Succès", data });
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getCalendar = async (req, res) => {
  const ref_parc = req.params.ref_parc;

  try {
    ParcsCalendar.findAll({
      where: {
        ref_parc: ref_parc,
      },
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

exports.getAllCalendar = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    ParcsCalendar.findAll({ where: { ref_parc: id } })
      .then((calendar) => {
        const message = "La liste des articles a été récupérée avec succès";
        return res.json({ message, data: calendar });
      })
      .catch((error) => {
        const message =
          "La liste des articles n'a pas pu être récupérée. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  } else {
    ParcsCalendar.findAll()
      .then((articles) => {
        const message = "La liste des articles a été récupérée avec succès";
        return res.json({ message, data: articles });
      })
      .catch((error) => {
        const message =
          "La liste des articles n'a pas pu être récupérée. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  }
};
