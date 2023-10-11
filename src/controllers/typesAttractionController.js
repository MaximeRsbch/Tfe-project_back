const TypeAttraction = require("../db/sequelize.js");

exports.findAllTypesAttraction = (req, res, next) => {
  TypeAttraction.findAll()
    .then((typesAttraction) => {
      res.status(200).json(typesAttraction);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.createTypesAttraction = (req, res, next) => {
  const typeAttraction = req.body;
  TypeAttraction.create(typeAttraction)
    .then((typeAttraction) => {
      res.status(201).json(typeAttraction);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.findOneTypesAttraction = (req, res, next) => {
  const id = req.params.id;
  TypeAttraction.findByPk(id)
    .then((typeAttraction) => {
      if (typeAttraction) {
        res.status(200).json(typeAttraction);
      } else {
        res.status(404).json("TypeAttraction not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.updateTypesAttraction = (req, res, next) => {
  const id = req.params.id;
  const typeAttraction = req.body;
  TypeAttraction.update(typeAttraction, { where: { id: id } })
    .then((typeAttraction) => {
      res.status(200).json(typeAttraction);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.deleteTypesAttraction = (req, res, next) => {
  const id = req.params.id;
  TypeAttraction.destroy({ where: { id: id } })
    .then((typeAttraction) => {
      res.status(200).json(typeAttraction);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.findAllAttractionsByType = (req, res, next) => {
  const id = req.params.id;
  TypeAttraction.findByPk(id, {
    include: [
      {
        model: Attraction,
        as: "attractions",
        attributes: {
          exclude: ["typeAttractionId", "createdAt", "updatedAt"],
        },
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
