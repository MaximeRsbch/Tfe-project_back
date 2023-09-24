const { Comment } = require("../../db/sequelize.js");

exports.deleteOneComment = (req, res, next) => {
  Comment.destroy({
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
  Comment.findAll()
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
  Comment.create({
    content: req.body.content,
    canComment: true,
  })
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
