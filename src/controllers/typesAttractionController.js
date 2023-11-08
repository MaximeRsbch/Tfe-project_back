const { TypeAttraction } = require("../db/sequelize.js");

exports.findAllTypesAttraction = (req, res, next) => {
  TypeAttraction.findAll()
    .then((typesAttraction) => {
      const message = "La liste des types d'attractions a bien été récupérée";
      return res.json({ message, data: typesAttraction });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.createTypesAttraction = (req, res, next) => {
  const name = req.body.name;

  TypeAttraction.create({
    name: name,
  })
    .then((typeAttraction) => {
      const message = "Le type d'attraction a bien été créé";
      return res.json({ message, data: typeAttraction });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.findOneTypesAttraction = (req, res, next) => {
  TypeAttraction.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((typeAttraction) => {
      res.json(typeAttraction);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
