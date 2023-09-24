const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.js");
const CommentModel = require("../models/comment.js");
const ArticleModel = require("../models/articles.js");
const ImgArticleModel = require("../models/img_article.js");

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
const Article = ArticleModel(sequelize, DataTypes);
const ImgArticle = ImgArticleModel(sequelize, DataTypes);

ImgArticle.belongsTo(Article, { foreignKey: "ref_article" });

Comment.belongsTo(User, { foreignKey: "ref_user" });

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
  Article,
  ImgArticle,
};
