const { Article, CommentArticles } = require("../db/sequelize.js");
const fs = require("fs");

exports.createArticle = (req, res, next) => {
  if (req.userRole !== "admin") {
    const message = "Vous n'avez pas les droits pour créer un article";
    return res.status(401).json({ message });
  }
  let imagePath = null;

  if (req.file) {
    imagePath = req.file.path;
  }
  Article.create({
    title: req.body.title,
    content: req.body.content,
    img_url: imagePath,
  })
    .then((article) => {
      const message = "L'article a été créé avec succès";
      return res.json({ message });
    })
    .catch((e) => {
      const message =
        "L'article n'a pas pu être créé. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: e });
    });
};

exports.deleteArticle = (req, res, next) => {
  if (req.userRole !== "admin") {
    const message = "Vous n'avez pas les droits pour créer un article";
    return res.status(401).json({ message });
  }
  Article.findOne({ where: { id: req.params.id } })
    .then((article) => {
      fs.unlink(__basedir + "/" + article.img_url, (err) => {
        if (err) {
          const message =
            "L'article n'a pas pu être supprimé. Réessayez dans quelques instants";
          return res.status(500).json({ message, data: err });
        }
      });
      Article.destroy({ where: { id: req.params.id } })
        .then((article) => {
          const message = "L'article a été supprimé avec succès";
          return res.json({ message });
        })
        .catch((error) => {
          const message =
            "L'article n'a pas pu être supprimé. Réessayez dans quelques instants";
          return res.json({ message, data: error });
        });
    })
    .catch((error) => {
      const message =
        "L'article n'a pas pu être supprimé. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: error });
    });
};

exports.getArticles = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Article.findOne({ where: { id: id } }).then((article) => {
      CommentArticles.findAll({ where: { ref_article: id } })
        .then((comments) => {
          article.comments = comments;
          const message = "L'article a été récupéré avec succès";
          return res.json({ message, data: article });
        })
        .catch((error) => {
          const message =
            "La liste des commentaires n'a pas pu être récupérée. Réessayez dans quelques instants";
          return res.json({ message, data: error });
        });
    });
  } else {
    Article.findAll()
      .then((articles) => {
        const message = "La liste des articles a été récupérée avec succès";
        return res.json({ message, data: articles });
      })
      .catch((error) => {
        const message =
          "La liste des articles n'a pas pu être récupérée. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  }
};
