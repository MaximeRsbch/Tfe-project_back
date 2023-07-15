const { User } = require("../../db/sequelize");

module.exports = (app) => {
  app.put("/api/mute/:id", (req, res) => {
    const mute = req.body.canComment;
    const id = req.params.id;

    User.update({ canComment: mute }, { where: { id: id } });
  });
};
