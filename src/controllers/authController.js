const { User, Token } = require("../db/sequelize.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key.js");
const { sendingMail } = require("../mail/sendMail.js");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        const message = `L'user demandé n'existe pas.`;
        return res.status(404).json({ message });
      }
      // if (!user.isVerified) {
      //   const message = `L'utilisateur n'est pas vérifié. Veuillez vérifier votre adresse mail.`;
      //   return res.status(401).json({ message });
      // }

      bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = "Le mdp est incorrect";
            return res.status(401).json({ message });
          }

          //JWT
          const token = jwt.sign(
            { id_user: user.id, role: user.role },
            privateKey,
            {
              expiresIn: "1h",
            }
          );

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
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      const message = `L'email est déjà utilisé.`;
      return res.status(401).json({ message });
    }
  });

  User.findOne({ where: { username: username } }).then((user) => {
    if (user) {
      const message = `Le pseudo existe déjà`;
      return res.status(401).json({ message });
    }
  });

  bcrypt.hash(password, 10).then((hash) => {
    const user = {
      username: username,
      email: email,
      password: hash,
    };

    User.create(user)
      .then((user) => {
        Token.create({
          ref_user: user.id,
          token: crypto.randomBytes(16).toString("hex"),
        })
          .then((token) => {
            //Send Mail here
            if (token) {
              sendingMail({
                to: user.email,
                subject: "Vérification de votre adresse mail WatchUrPark",
                text: `Bonjour, ${user.username}. Veuillez vérifier votre adresse mail en cliquant sur le lien suivant :
                http://localhost:3000/api/auth/verify/${user.id}/${token.token}`,
              })
                .then((result) => {
                  const message = `L'utilisateur a été créé avec succès`;
                  return res.json({ message });
                })
                .catch((e) => {
                  const message = `L'utilisateur a été créé avec succès mais le mail n'a pas pu être envoyé`;
                  return res.json({ message });
                });
            } else {
              const message = `Le token n'a pas pu être créé.`;
              return res.status(401).json({ message });
            }
          })
          .catch((err) => {
            console.log(err);
            const message = `L'user n'a pas pu être créé. Réessayez dans quelques instants`;
            return res.status(401).json({ message });
          });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être créé. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  });
};

exports.verifyEmail = (req, res, next) => {
  const id = req.params.id;
  const token = req.params.token;

  Token.findOne({ where: { ref_user: id } }).then((tokenDB) => {
    if (!tokenDB) {
      const message = `Le token n'existe pas.`;
      return res.status(401).json({ message });
    }

    if (tokenDB.token !== token) {
      const message = `Le token est invalide.`;
      return res.status(401).json({ message });
    }

    // User.findOne({
    //   where: { id: id },
    // }).then((user) => {
    //   if (!user) {
    //     const message = `L'user n'existe pas.`;
    //     return res.status(401).json({ message });
    //   }
    //   // if (user.isVerified) {
    //   //   const message = `L'user est déjà vérifié.`;
    //   //   return res.status(401).json({ message });
    //   // }
    //   // User.update(
    //   //   { isVerified: true },
    //   //   {
    //   //     where: { id: id },
    //   //   }
    //   // )
    //     .then((result) => {
    //       res.status(200).json(result);
    //     })
    //     .catch((err) => res.status(400).json(err));
    // });
  });
};
