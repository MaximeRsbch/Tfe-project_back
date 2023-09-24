const { User } = require("../db/sequelize.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../../auth/private_key.js");

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        const message = `L'user demandé n'existe pas.`;
        return res.status(404).json({ message });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = "Le mdp est incorrect";
            return res.status(401).json({ message });
          }

          //JWT
          const token = jwt.sign({ userID: user.id }, privateKey, {
            expiresIn: "24h",
          });

          const message = "L'utilisateur a été connecté avec succès";
          return res.json({ message, data: user, token });
        });
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};

exports.register = (req, res, next) => {
  bcrypt.hash(password, 10).then((hash) => {
    const user = {
      username: username,
      email: email,
      password: hash,
    };

    User.create(user)
      .then((user) => {
        const token = jwt.sign({ userID: user.id }, privateKey, {
          expiresIn: "24h",
        });
        const message = "L'utilisateur a été créé avec succès";
        return res.json({ message, data: user, token });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être créé. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  });
};
