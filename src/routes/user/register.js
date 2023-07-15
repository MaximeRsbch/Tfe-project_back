const { User } = require("../../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../../auth/private_key.js");

module.exports = (app) => {
  app.post("/api/register", (req, res) => {
    console.log(req.body.password);
    console.log(req.body.email);
    console.log(req.body.username);

    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;

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
  });
};
