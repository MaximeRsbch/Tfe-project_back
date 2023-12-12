const { Secours } = require("../db/sequelize");

exports.addSecours = async (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const ref_parc = req.body.ref_parc;

  Secours.create({
    latitude: latitude,
    longitude: longitude,
    ref_parc: ref_parc,
  })
    .then((secours) => {
      res.status(201).json(secours);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.deleteSecours = async (req, res) => {
  const id = req.params.id;

  Secours.destroy({
    where: {
      id: id,
    },
  })
    .then((secours) => {
      res.status(201).json(secours);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.updateSecours = async (req, res) => {
  const id = req.params.id;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const ref_parc = req.body.ref_parc;

  Secours.update(
    {
      latitude: latitude,
      longitude: longitude,
      ref_parc: ref_parc,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((secours) => {
      res.status(201).json(secours);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.getSecours = async (req, res) => {
  const id = req.params.id;
  if (id) {
    Secours.findAll({ where: { ref_parc: id } })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err.message });
      });
  } else {
    Secours.findAll()
      .then((attr) => {
        res.json(attr);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};