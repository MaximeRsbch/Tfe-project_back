const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("../models/user.js");
const CommentModel = require("../models/comment.js");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("tfe", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const User = UserModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    Comment.create({
      content: "Ceci est un commentaire",
    }).then((comment) => console.log(comment.toJSON));

    bcrypt
      .hash("admin", 10)
      .then((hash) =>
        User.create({
          role: "admin",
          username: "admin",
          email: "admin@admin.com",
          password: hash,
        })
      )
      .then((user) => console.log(user.toJSON));

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Comment,
  User,
};
