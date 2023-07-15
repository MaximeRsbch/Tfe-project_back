const { User } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("/api/user/:id", (req, res) => {
    User.update(req.body, {
      where: { id: req.params.id },
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => res.status(400).json(err));
  });
};
