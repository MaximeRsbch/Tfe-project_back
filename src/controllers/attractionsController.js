const {
  Attraction,
  imgAttr,
  Review,
  CommentAttr,
  Favoris,
} = require("../db/sequelize.js");
const axios = require("axios");

exports.findAttractionQueueTime = (req, res, next) => {
  const id = req.params.id;

  axios
    .get(`https://queue-times.com/parks/${id}/queue_times.json`)
    .then((response) => {
      console.log(response.data.lands);
      let attrList = null;
      if (response.data.rides.length > 0) {
        attrList = response.data.rides;
        res.status(200).json(attrList);
      } else if (response.data.lands) {
        attrList = response.data.lands;
        res.status(200).json(attrList);
      }
    });
};

exports.createImgAttraction = (req, res, next) => {
  const id = req.body.id;
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path;
  }

  console.log(id);
  console.log(req.file);

  Attraction.findOne({
    where: {
      id: id,
    },
  }).then((attraction) => {
    console.log(attraction);
    if (attraction === null) {
      res.status(500).json({ message: "Attraction non trouvée" });
    } else {
      imgAttr
        .create({
          url_img: imagePath,
          ref_attraction: id,
        })
        .then((img) => {
          res.status(201).json(img);
          console.log(img);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });
};

exports.createAttraction = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer une attraction";
    return res.status(401).json({ message });
  }

  const id = req.body.id;
  const name = req.body.name;
  const minHeight = req.body.minHeight;
  const maxHeight = req.body.maxHeight;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const description = req.body.description;

  const type = req.body.type;
  const parc = req.body.parc;
  const isFavorite = req.body.isFavorite;
  const showCommentaires = req.body.showCommentaires;

  Attraction.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (attr) {
        res.status(500).json({ message: "Attraction déjà existante" });
      } else {
        Attraction.create({
          id: id,
          nom: name,
          minHeight: minHeight,
          maxHeight: maxHeight,
          latitude: latitude,
          longitude: longitude,
          description: description,
          ref_type: type,
          ref_parc: parc,
          isFavorite: isFavorite,
          showCommentaires: showCommentaires,
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

exports.findAttraction = async (req, res) => {
  const id = req.params.id;
  if (id) {
    Attraction.findAll({
      where: {
        ref_parc: id,
      },

      include: [
        {
          model: Review,
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
    Attraction.findAll()
      .then((attr) => {
        res.json(attr);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

exports.findAllAttractions = (req, res, next) => {
  Attraction.findAll({
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
      {
        model: Favoris,
      },
    ],
  })
    .then((attr) => {
      res.json(attr);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.updateAttraction = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour modifier une attraction";
    return res.status(401).json({ message });
  }

  const id = req.params.id;
  const name = req.body.name;
  const minHeight = req.body.minHeight;
  const maxHeight = req.body.maxHeight;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const description = req.body.description;
  const showCommentaires = req.body.showCommentaires;

  Attraction.update(
    {
      nom: name,
      minHeight: minHeight,
      maxHeight: maxHeight,
      latitude: latitude,
      longitude: longitude,
      description: description,
      showCommentaires: showCommentaires,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((attr) => {
      res.json(attr);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.deleteAttraction = (req, res, next) => {
  const id = req.params.id;

  imgAttr
    .destroy({
      where: {
        ref_attraction: id,
      },
    })
    .then((_) => {
      Attraction.destroy({
        where: {
          id: id,
        },
      })
        .then((attr) => {
          res.json({ message: "Attraction supprimée" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.deleteImgAttraction = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour supprimer une attraction";
    return res.status(401).json({ message });
  }
  const id = req.params.id;

  imgAttr
    .destroy({
      where: {
        id: id,
      },
    })
    .then((_) => {
      res.json({ message: "Image supprimée" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
