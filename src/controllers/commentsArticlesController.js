const { CommentArticles, User } = require("../db/sequelize.js");

exports.deleteOneComment = (req, res, next) => {
  CommentArticles.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((comment) => {
      res.json({ message: "Commentaire supprimé" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.findAllComments = (req, res, next) => {
  CommentArticles.findAll({
    where: {
      ref_article: req.params.id,
    },
  })
    .then((comments) => {
      res.json({ data: comments });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.writeCommment = (req, res, next) => {
  const content = req.body.content;
  const ref_user = req.body.ref_user;
  const ref_article = req.body.ref_article;

  User.findOne({
    id: ref_user,
  }).then((user) => {
    if (user.canComment === true) {
      CommentArticles.create({
        content: content,
        ref_user: ref_user,
        ref_article: ref_article,
      })
        .then((comment) => {
          res.json(comment);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    } else {
      res.status(500).json({ message: "Vous ne pouvez pas commenter" });
    }
  });
};
