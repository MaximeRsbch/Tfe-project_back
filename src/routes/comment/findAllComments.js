const { Comment } = require("../../db/sequelize");
const auth = require("../../auth/auth.js");

module.exports = (app) => {
  app.get("/api/comments", (req, res) => {
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
  });
};
