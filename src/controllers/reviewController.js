const { Review } = require("../db/sequelize");

exports.addReview = async (req, res) => {
  const id_user = req.body.id_user;
  const id_attraction = req.body.id_attraction;
  const note = req.body.note;

  Review.create({
    ref_user: id_user,
    ref_attraction: id_attraction,
    rating: note,
  })
    .then((review) => {
      res.status(201).json(review);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.deleteReview = async (req, res) => {
  const id = req.params.id;

  Review.destroy({
    where: {
      id: id,
    },
  })
    .then((review) => {
      res.status(201).json(review);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.updateReview = async (req, res) => {
  const id = req.params.id;
  const note = req.body.note;

  Review.update(
    {
      rating: note,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((review) => {
      res.status(201).json(review);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
