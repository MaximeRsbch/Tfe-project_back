const { User } = require("../../db/sequelize.js");

module.exports = (app) => {
  app.get("/api/oneuser/:id", (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        const message = "L'utilisateur a bien été trouvé";
        return res.json({ message, data: user });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être trouvé. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  });
};
