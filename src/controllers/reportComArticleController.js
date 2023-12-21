const { User, CommentArticles, ReportComArticle } = require("../db/sequelize");

exports.getAllReportArticle = (req, res, next) => {
  ReportComArticle.findAll({
    include: [
      {
        model: User,
      },
      {
        model: CommentArticles,
      },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

exports.getReportArticle = (req, res, next) => {
  ReportComArticle.findAll({
    include: [
      {
        model: User,
      },
      {
        model: CommentArticles,
      },
    ],
  })
    .then((rest) => {
      res.json(rest);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.createReportArticle = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const ref_user = req.body.ref_user;
  const ref_commentArticles = req.body.ref_commentArticles;

  ReportComArticle.create({
    id: id,
    title: title,
    description: description,
    ref_user: ref_user,
    ref_commentArticles: ref_commentArticles,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

exports.updateReportArticle = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const ref_user = req.body.ref_user;
  const ref_commentArticles = req.body.ref_commentArticles;

  ReportComArticle.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (!attr) {
        const message = "Le ticket n'existe pas";
        return res.status(404).json({ message });
      }

      ReportComArticle.update(
        {
          title: title,
          description: description,
          ref_user: ref_user,
          ref_commentArticles: ref_commentArticles,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

exports.deleteReportArticle = (req, res, next) => {
  const id = req.params.id;

  ReportComArticle.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (!attr) {
        const message = "Le ticket n'existe pas";
        return res.status(404).json({ message });
      }

      ReportComArticle.destroy({
        where: {
          id: id,
        },
      })
        .then((data) => {
          res.status(200).json({ message: "Le ticket a été supprimé" });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};
