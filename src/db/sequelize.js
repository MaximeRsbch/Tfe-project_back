const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
/* -------------------------------------------------------------------------- */
const UserModel = require("../models/user.js");
const CommentArticlesModel = require("../models/commentarticles.js");
const ArticleModel = require("../models/articles.js");
const ImgArticleModel = require("../models/img_article.js");
const AttractionModel = require("../models/attractions.js");
const CommentAttrModel = require("../models/commentAttr.js");
const ParcsModel = require("../models/parcs.js");
const ParcsCalendarModel = require("../models/parcscalendar.js");
const ReviewModel = require("../models/review.js");
const TypeAttractionModel = require("../models/typeattraction.js");

const sequelize = new Sequelize("tfe", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const User = UserModel(sequelize, DataTypes);
const CommentArticles = CommentArticlesModel(sequelize, DataTypes);
const Article = ArticleModel(sequelize, DataTypes);
const ImgArticle = ImgArticleModel(sequelize, DataTypes);
const Attraction = AttractionModel(sequelize, DataTypes);
const CommentAttr = CommentAttrModel(sequelize, DataTypes);
const Parcs = ParcsModel(sequelize, DataTypes);
const ParcsCalendar = ParcsCalendarModel(sequelize, DataTypes);
const Review = ReviewModel(sequelize, DataTypes);
const TypeAttraction = TypeAttractionModel(sequelize, DataTypes);

ImgArticle.belongsTo(Article, { foreignKey: "ref_article" });

CommentArticles.belongsTo(User, { foreignKey: "ref_user" });
CommentArticles.belongsTo(Article, { foreignKey: "ref_article" });

Review.belongsTo(User, { foreignKey: "ref_user" });
Review.belongsTo(Attraction, { foreignKey: "ref_attraction" });

ParcsCalendar.belongsTo(Parcs, { foreignKey: "ref_parc" });

ImgArticle.belongsTo(Article, { foreignKey: "ref_article" });

CommentAttr.belongsTo(User, { foreignKey: "ref_user" });
CommentAttr.belongsTo(Attraction, { foreignKey: "ref_attraction" });

Attraction.belongsTo(TypeAttraction, { foreignKey: "ref_type" });
Attraction.belongsTo(Parcs, { foreignKey: "ref_parc" });

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
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
  CommentArticles,
  User,
  Article,
  ImgArticle,
  Attraction,
  CommentAttr,
  Parcs,
  ParcsCalendar,
  Review,
  TypeAttraction,
};
