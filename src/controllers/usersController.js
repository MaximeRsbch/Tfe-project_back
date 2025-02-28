const { User, Token, Favoris, Modo, ModoParc } = require("../db/sequelize");
const fs = require("fs");

exports.deleteUser = (req, res, next) => {
  Token.destroy({ where: { ref_user: req.params.id } })
    .then((_) => {
      Modo.destroy({ where: { ref_user: req.params.id } })
        .then((_) => {
          ModoParc.destroy({ where: { ref_user: req.params.id } })
            .then((_) => {
              Favoris.destroy({ where: { ref_user: req.params.id } })
                .then((_) => {
                  User.destroy({ where: { id: req.params.id } })
                    .then((_) => {
                      const message = "L'utilisateur a bien été supprimé";
                      return res.json({ message, data: _ });
                    })
                    .catch((error) => {
                      const message =
                        "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants";
                      return res.json({ message, data: error });
                    });
                })
                .catch((error) => {
                  const message =
                    "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants";
                  return res.json({ message, data: error });
                });
            })
            .catch((error) => {
              const message =
                "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants";
              return res.json({ message, data: error });
            });
        })
        .catch((error) => {
          const message =
            "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants";
          return res.json({ message, data: error });
        });
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
      include: [
        {
          model: Favoris,
        },
        {
          model: Modo,
        },
      ],
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

exports.findUsersById = (req, res, next) => {
  const id = req.params.id;

  User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Favoris,
      },
    ],
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
};

exports.modifyUser = (req, res, next) => {
  let profileImagePath = null;
  let backgroundImagePath = null;

  if (req.files && req.files.img) {
    profileImagePath = req.files.img[0].path;
  }

  // Vérifier si l'image de fond est présente
  if (req.files && req.files.background) {
    backgroundImagePath = req.files.background[0].path;
  }

  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (
        profileImagePath !== user.profileimg_url ||
        backgroundImagePath !== user.backgroundimg_url
      ) {
        fs.unlink(__basedir + "/" + user.profileimg_url, (err) => {
          if (err) {
            const message =
              "L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants";
            return res.status(500).json({ message, data: err });
          }
        });
        fs.unlink(__basedir + "/" + user.backgroundimg_url, (err) => {
          if (err) {
            const message =
              "L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants";
            return res.status(500).json({ message, data: err });
          }
        });
      }
      User.update(
        {
          body: req.body,
          profileimg_url: profileImagePath,
          backgroundimg_url: backgroundImagePath,
        },
        {
          where: { id: req.params.id },
        }
      )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: error });
    });
};

exports.muteUser = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modo") {
    const message = "Vous n'avez pas les droits pour muter cet user";
    return res.status(401).json({ message });
  }
  const mute = false;
  const id = req.params.id;

  User.update({ canComment: mute }, { where: { id: id } });
};

exports.unmuteUser = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modo") {
    const message = "Vous n'avez pas les droits pour unmute cet user";
    return res.status(401).json({ message });
  }
  const mute = true;
  const id = req.params.id;

  User.update({ canComment: mute }, { where: { id: id } });
};

exports.changeRole = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message =
      "Vous n'avez pas les droits pour changer le rôle de cet user";
    return res.status(401).json({ message });
  }
  const role = req.body.role;
  const id = req.params.id;

  User.update({ role: role }, { where: { id: id } });
};
