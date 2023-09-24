const { User } = require("../../db/sequelize");

exports.deleteUser = (req, res, next) => {
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
};

exports.findUsers = (req, res, next) => {
  const id = req.params.id;

  if (id) {
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
  } else {
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
  }
};

exports.modifyUser = (req, res, next) => {
  User.update(req.body, {
    where: { id: req.params.id },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => res.status(400).json(err));
};

exports.muteUser = (req, res, next) => {
  const mute = req.body.canComment;
  const id = req.params.id;

  User.update({ canComment: mute }, { where: { id: id } });
};
