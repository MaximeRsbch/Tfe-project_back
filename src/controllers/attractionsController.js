const { Attraction, ImgAttr } = require("../db/sequelize.js");
const axios = require("axios");

exports.findAttractionQueueTime = (req, res, next) => {
  const id = req.params.id;

  axios
    .get(`https://queue-times.com/parks/${id}/queue_times.json`)
    .then((response) => {
      let attrList = null;
      if (response.data.rides.length > 0) {
        attrList = response.data.rides;
        res.status(200).json(attrList);
      } else if (response.data.lands) {
        attrList = response.data.lands.rides;
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

  Attraction.findOne({
    where: {
      id: id,
    },
  }).then((attraction) => {
    if (attraction === null) {
      res.status(500).json({ message: "Attraction non trouvée" });
    } else {
      ImgAttr.create({
        img_url: imagePath,
        ref_attraction: id,
      })
        .then((img) => {
          res.status(201).json(img);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });
};

exports.createAttraction = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const minHeight = req.body.minHeight;
  const maxHeight = req.body.maxHeight;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const description = req.body.description;

  const type = req.body.type;
  const parc = req.body.parc;

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

exports.findAttraction = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Attraction.findAll({
      where: {
        ref_parc: id,
      },
    })
      .then((attr) => {
        res.json(attr);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
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

exports.updateAttraction = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const minHeight = req.body.minHeight;
  const maxHeight = req.body.maxHeight;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const description = req.body.description;

  Attraction.update(
    {
      nom: name,
      minHeight: minHeight,
      maxHeight: maxHeight,
      latitude: latitude,
      longitude: longitude,
      description: description,
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

  Attraction.destroy({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      ImgAttr.destroy({
        where: {
          ref_attraction: id,
        },
      })
        .then((img) => {
          res.status(200).json({ message: "Attraction supprimée" });
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
