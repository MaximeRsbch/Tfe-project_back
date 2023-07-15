const { User } = require("../../db/sequelize");
const auth = require("../../auth/auth.js");

module.exports = (app) => {
  app.get("/api/users", (req, res) => {
    User.findAll()
      .then((users) => {
        const message = "La liste des utilisateurs a bien été récupérée";
        return res.json({ message, data: users });
      })
      .catch((error) => {
        const message =
          "La liste des utilisateurs n'a pas pu être récupérée. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  });
};
