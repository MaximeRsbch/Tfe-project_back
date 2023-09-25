const { CommentAttr, User } = require("../../db/sequelize.js");

exports.deleteOneComment = (req, res, next) => {
  CommentAttr.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((comment) => {
      res.json(comment);
      const message = "Le commentaire a bien été supprimé";
      return res.json({ message, data: comment });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.findAllComments = (req, res, next) => {
  CommentAttr.findAll()
    .then((comments) => {
      const message = "La liste des commentaires a bien été récupérée";
      return res.json({ message, data: comments });
    })
    .catch((error) => {
      const message =
        "La liste des commentaires n'a pas pu être récupérée. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};

exports.writeCommment = (req, res, next) => {
  const content = req.body.content;
  const ref_user = req.body.ref_user;
  const ref_attraction = req.body.ref_article;

  User.findOne({
    id: ref_user,
  }).then((user) => {
    if (user.canComment === true) {
      CommentAttr.create({
        content: content,
        ref_user: ref_user,
        ref_article: ref_attraction,
      })
        .then((comment) => {
          res.status(201).json(comment);
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
