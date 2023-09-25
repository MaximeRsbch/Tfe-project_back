const { Articles, ImgArticle, Comment } = require("../db/sequelize.js");

exports.createArticle = (req, res, next) => {
  let imagePath = null;

  try {
    if (req.file) {
      imagePath = req.file.path;
    } else if (req.files) {
      imagePath = req.files.map((file) => file.path);
    }

    const article = {
      title: req.body.title,
      content: req.body.content,
    };

    Articles.create(article)
      .then((article) => {
        if (imagePath) {
          const images = imagePath.map((path) => ({
            path,
            ref_article: article.id,
          }));
          ImgArticle.bulkCreate(images)
            .then((images) => {
              const message = "L'article a été créé avec succès";
              return res.json({ message });
            })
            .catch((error) => {
              const message =
                "L'article a été créé avec succès mais les images n'ont pas pu être ajoutées. Réessayez dans quelques instants";
              return res.json({ message, data: error });
            });
        } else {
          const message = "L'article a été créé avec succès";
          return res.json({ message });
        }
      })
      .catch((error) => {
        const message =
          "L'article n'a pas pu être créé. Réessayez dans quelques instants";
        return res.json({ message, data: error });
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteArticle = (req, res, next) => {
  Articles.destroy({ where: { id: req.params.id } })
    .then((article) => {
      const message = "L'article a été supprimé avec succès";
      return res.json({ message });
    })
    .catch((error) => {
      const message =
        "L'article n'a pas pu être supprimé. Réessayez dans quelques instants";
      return res.json({ message, data: error });
    });
};

exports.getArticles = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Articles.findOne({ where: { id: id } }).then((article) => {
      Comment.findAll({ where: { ref_article: id } })
        .then((comments) => {
          article.comments = comments;
          ImgArticle.findAll({ where: { ref_article: id } })
            .then((images) => {
              article.images = images;
              const message = "L'article a été récupéré avec succès";
              return res.json({ message, data: article });
            })
            .catch((error) => {
              const message =
                "La liste des images n'a pas pu être récupérée. Réessayez dans quelques instants";
              return res.json({ message, data: error });
            });
        })
        .catch((error) => {
          const message =
            "La liste des commentaires n'a pas pu être récupérée. Réessayez dans quelques instants";
          return res.json({ message, data: error });
        });
    });
  } else {
    Articles.findAll()
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
