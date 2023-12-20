const { Review, User } = require("../db/sequelize");

exports.addReview = async (req, res) => {
  const id_user = req.body.id_user;
  const id_attraction = req.body.id_attraction;
  const note = req.body.note;
  const content = req.body.content;

  Review.create({
    ref_user: id_user,
    ref_attraction: id_attraction,
    rating: note,
    content: content,
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

exports.findAllReviews = (req, res, next) => {
  Review.findAll({
    where: {
      ref_attraction: req.params.id,
    },
    include: [
      {
        model: User,
      },
    ],
  })
    .then((reviews) => {
      res.json({ data: reviews });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
