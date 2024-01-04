const {
  Attraction,
  imgAttr,
  Review,
  CommentAttr,
  Favoris,
  Parcs,
} = require("../db/sequelize.js");
const axios = require("axios");

exports.findAttractionQueueTime = (req, res, next) => {
  const id = req.params.id;

  axios
    .get(`https://queue-times.com/parks/${id}/queue_times.json`)
    .then((response) => {
      let allAttractions = [];

      if (response.data.rides.length === 0) {
        response.data.lands.forEach((land) => {
          allAttractions = allAttractions.concat(land.rides);
        });
        res.status(200).json(allAttractions);
      } else {
        res.status(200).json(response.data.rides);
      }
    });
};

exports.createImgAttraction = (req, res, next) => {
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path;
  }

  imgAttr
    .create({
      img_url: imagePath,
      ref_attraction: req.body.ref_attraction,
    })
    .then((img) => {
      const message = "L'image a été créé avec succès";
      return res.json({ message, data: img });
    })
    .catch((err) => {
      const message =
        "L'image n'a pas pu être créé. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: err });
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
      console.log(error);
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
      {
        model: Parcs,
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
      Favoris.destroy({
        where: {
          ref_attraction: id,
        },
      })
        .then((_) => {
          CommentAttr.destroy({
            where: {
              ref_attraction: id,
            },
          })
            .then((_) => {
              Review.destroy({
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
                    .then((_) => {
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
