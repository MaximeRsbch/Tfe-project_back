const { Article, CommentArticles, Parcs } = require("../db/sequelize.js");
const fs = require("fs");

exports.createArticle = (req, res, next) => {
  if (req.userRole !== "admin" && req.userRole !== "modoParc") {
    const message = "Vous n'avez pas les droits pour créer une attraction";
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
    showCommentaires: req.body.showCommentaires,

    ref_parc: req.body.ref_parc,
  })
    .then((article) => {
      const message = "L'article a été créé avec succès";
      return res.json({ message, data: article });
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
  } else {
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
  }
};

exports.updateArticle = (req, res, next) => {
  if (req.userRole !== "admin") {
    const message = "Vous n'avez pas les droits pour créer un article";
    return res.status(401).json({ message });
  }
  let imagePath = req.body.img_url;

  if (req.file) {
    imagePath = req.file.path;
  }

  Article.findOne({ where: { id: req.params.id } })
    .then((article) => {
      if (imagePath !== article.img_url) {
        fs.unlink(__basedir + "/" + article.img_url, (err) => {
          if (err) {
            const message =
              "L'article n'a pas pu être modifié. Réessayez dans quelques instants";
            return res.status(500).json({ message, data: err });
          }
        });
      }
      Article.update(
        {
          title: req.body.title,
          content: req.body.content,
          img_url: imagePath,
          showCommentaires: req.body.showCommentaires,
        },
        { where: { id: req.params.id } }
      )
        .then((article) => {
          const message = "L'article a été modifié avec succès";
          return res.json({ message, data: article });
        })
        .catch((error) => {
          const message =
            "L'article n'a pas pu être modifié. Réessayez dans quelques instants";
          return res.json({ message, data: error });
        });
    })
    .catch((error) => {
      const message =
        "L'article n'a pas pu être modifié. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: error });
    });
};

exports.getAllArticles = (req, res, next) => {
  Article.findAll({
    include: [
      {
        model: CommentArticles,
      },
    ],
  })
    .then((articles) => {
      const message = "La liste des articles a bien été récupérée";
      return res.json({ message, data: articles });
    })
    .catch((error) => {
      const message =
        "La liste des articles n'a pas pu être récupérée. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: error });
    });
};

exports.getArticleById = (req, res, next) => {
  Article.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: CommentArticles,
      },
    ],
  })
    .then((article) => {
      const message = "L'article a bien été récupéré";
      return res.json({ message, data: article });
    })
    .catch((error) => {
      const message =
        "L'article n'a pas pu être récupéré. Réessayez dans quelques instants";
      return res.status(500).json({ message, data: error });
    });
};
