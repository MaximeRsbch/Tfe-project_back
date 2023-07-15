const { Comment } = require("../../db/sequelize.js");

module.exports = (app) => {
  app.delete("/api/deleteComment/:id", (req, res) => {
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
  });
};
