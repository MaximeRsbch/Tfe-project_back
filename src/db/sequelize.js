const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
/* -------------------------------------------------------------------------- */
const UserModel = require("../models/user.js");
const CommentArticlesModel = require("../models/commentarticles.js");
const ArticleModel = require("../models/articles.js");
const AttractionModel = require("../models/attractions.js");
const CommentAttrModel = require("../models/commentAttr.js");
const ParcsModel = require("../models/parcs.js");
const ParcsCalendarModel = require("../models/parcscalendar.js");
const ReviewModel = require("../models/review.js");
const TypeAttractionModel = require("../models/typeattraction.js");
const imgAttrModel = require("../models/imgAttr.js");

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
const Attraction = AttractionModel(sequelize, DataTypes);
const CommentAttr = CommentAttrModel(sequelize, DataTypes);
const Parcs = ParcsModel(sequelize, DataTypes);
const ParcsCalendar = ParcsCalendarModel(sequelize, DataTypes);
const Review = ReviewModel(sequelize, DataTypes);
const TypeAttraction = TypeAttractionModel(sequelize, DataTypes);
const imgAttr = imgAttrModel(sequelize, DataTypes);

CommentArticles.belongsTo(User, { foreignKey: "ref_user" });
CommentArticles.belongsTo(Article, { foreignKey: "ref_article" });
User.hasMany(CommentArticles, { foreignKey: "ref_user" });
Article.hasMany(CommentArticles, { foreignKey: "ref_article" });

Review.belongsTo(User, { foreignKey: "ref_user" });
Review.belongsTo(Attraction, { foreignKey: "ref_attraction" });
User.hasMany(Review, { foreignKey: "ref_user" });
Attraction.hasMany(Review, { foreignKey: "ref_attraction" });

ParcsCalendar.belongsTo(Parcs, { foreignKey: "ref_parc" });
Parcs.hasMany(ParcsCalendar, { foreignKey: "ref_parc" });

CommentAttr.belongsTo(User, { foreignKey: "ref_user" });
CommentAttr.belongsTo(Attraction, { foreignKey: "ref_attraction" });
User.hasMany(CommentAttr, { foreignKey: "ref_user" });
Attraction.hasMany(CommentAttr, { foreignKey: "ref_attraction" });

Attraction.belongsTo(TypeAttraction, { foreignKey: "ref_type" });
Attraction.belongsTo(Parcs, { foreignKey: "ref_parc" });
TypeAttraction.hasMany(Attraction, { foreignKey: "ref_type" });
Parcs.hasMany(Attraction, { foreignKey: "ref_parc" });

imgAttr.belongsTo(Attraction, { foreignKey: "ref_attraction" });
Attraction.hasMany(imgAttr, { foreignKey: "ref_attraction" });

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
  Attraction,
  CommentAttr,
  Parcs,
  ParcsCalendar,
  Review,
  TypeAttraction,
  imgAttr,
};
