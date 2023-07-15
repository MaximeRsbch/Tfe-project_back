const { User } = require("../../db/sequelize");

module.exports = (app) => {
  app.delete("/api/delete/:id", (req, res) => {
    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        const message = "L'utilisateur a bien été supprimé";
        return res.json({ message, data: user });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  });
};
