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
const TokenModel = require("../models/token.js");
const RestaurantModel = require("../models/restaurant.js");
const ToilettesModel = require("../models/toilettes.js");
const MagasinsModel = require("../models/magasins.js");
const ContactModel = require("../models/contact.js");
const ReportComArticleModel = require("../models/reportComArticle.js");
const ReportComAttrModel = require("../models/reportComAttr.js");
const EvenementModel = require("../models/evenement.js");
const FavorisModel = require("../models/favoris.js");
const SecoursModel = require("../models/secours.js");
const InfoModel = require("../models/info.js");
const ModoParcModel = require("../models/modoParc.js");
const ModoModel = require("../models/modo.js");

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
const Token = TokenModel(sequelize, DataTypes);
const Restaurant = RestaurantModel(sequelize, DataTypes);
const Toilettes = ToilettesModel(sequelize, DataTypes);
const Magasins = MagasinsModel(sequelize, DataTypes);
const Contact = ContactModel(sequelize, DataTypes);
const ReportComArticle = ReportComArticleModel(sequelize, DataTypes);
const ReportComAttr = ReportComAttrModel(sequelize, DataTypes);
const Evenement = EvenementModel(sequelize, DataTypes);
const Favoris = FavorisModel(sequelize, DataTypes);
const Secours = SecoursModel(sequelize, DataTypes);
const Info = InfoModel(sequelize, DataTypes);
const ModoParc = ModoParcModel(sequelize, DataTypes);
const Modo = ModoModel(sequelize, DataTypes);

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

Token.belongsTo(User, { foreignKey: "ref_user" });
User.hasOne(Token, { foreignKey: "ref_user", onDelete: "cascade" });

Restaurant.belongsTo(Parcs, { foreignKey: "ref_parc" });
Parcs.hasMany(Restaurant, { foreignKey: "ref_parc" });

Toilettes.belongsTo(Parcs, { foreignKey: "ref_parc" });
Parcs.hasMany(Toilettes, { foreignKey: "ref_parc" });

Magasins.belongsTo(Parcs, { foreignKey: "ref_parc" });
Parcs.hasMany(Magasins, { foreignKey: "ref_parc" });

Contact.belongsTo(User, { foreignKey: "ref_user" });
User.hasMany(Contact, { foreignKey: "ref_user" });

ReportComArticle.belongsTo(User, { foreignKey: "ref_user" });
User.hasMany(ReportComArticle, { foreignKey: "ref_user" });
ReportComArticle.belongsTo(CommentArticles, {
  foreignKey: "ref_commentArticles",
});
CommentArticles.hasMany(ReportComArticle, {
  foreignKey: "ref_commentArticles",
});

ReportComAttr.belongsTo(User, { foreignKey: "ref_user" });
User.hasMany(ReportComAttr, { foreignKey: "ref_user" });
ReportComAttr.belongsTo(Review, { foreignKey: "ref_review" });
Review.hasMany(ReportComAttr, { foreignKey: "ref_review" });

Evenement.belongsTo(Parcs, { foreignKey: "ref_parc" });
Parcs.hasMany(Evenement, { foreignKey: "ref_parc" });

Favoris.belongsTo(User, { foreignKey: "ref_user" });
User.hasMany(Favoris, { foreignKey: "ref_user" });
Favoris.belongsTo(Attraction, { foreignKey: "ref_attraction" });
Attraction.hasMany(Favoris, { foreignKey: "ref_attraction" });

Secours.belongsTo(Parcs, { foreignKey: "ref_parc" });
Parcs.hasMany(Secours, { foreignKey: "ref_parc" });

Info.belongsTo(Parcs, { foreignKey: "ref_parc" });
Parcs.hasMany(Info, { foreignKey: "ref_parc" });

ModoParc.belongsTo(User, { foreignKey: "ref_user" });
User.hasMany(ModoParc, { foreignKey: "ref_user" });
ModoParc.belongsTo(Parcs, { foreignKey: "ref_parc" });
Parcs.hasMany(ModoParc, { foreignKey: "ref_parc" });

Modo.belongsTo(User, { foreignKey: "ref_user" });
User.hasMany(Modo, { foreignKey: "ref_user" });
Modo.belongsTo(Parcs, { foreignKey: "ref_parc" });
Parcs.hasMany(Modo, { foreignKey: "ref_parc" });

const initDb = () => {
  return sequelize.sync({ force: false }).then((_) => {
    bcrypt.hash("admin", 10).then((hash) =>
      User.findOrCreate({
        where: {
          username: "admin",
        },
        defaults: {
          role: "admin",
          username: "admin",
          email: "admin@admin.com",
          password: hash,
          isVerified: true,
        },
      })
    );

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
  Token,
  Restaurant,
  Toilettes,
  Magasins,
  Evenement,
  Favoris,
  Secours,
  Info,
  ModoParc,
  Modo,
  Contact,
  ReportComArticle,
  ReportComAttr,
};
