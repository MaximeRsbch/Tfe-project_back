const {
  User,
  CommentArticles,
  CommentAttr,
  Report,
} = require("../db/sequelize");

exports.getAllReport = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Report.findAll({
      where: {
        ref_user: id,
      },
      include: [
        {
          model: User,
        },
        {
          model: CommentArticles,
        },
        {
          model: CommentAttr,
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
  } else {
    Report.findAll()
      .then((rest) => {
        res.json(rest);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

exports.getReport = (req, res, next) => {
  Report.findAll({
    include: [
      {
        model: User,
      },
      {
        model: CommentArticles,
      },
      {
        model: CommentAttr,
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

exports.createReport = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const ref_user = req.body.ref_user;
  const ref_commentArticles = req.body.ref_commentArticles;
  const ref_commentAttr = req.body.ref_commentAttr;

  Report.create({
    id: id,
    title: title,
    description: description,
    ref_user: ref_user,
    ref_commentArticles: ref_commentArticles,
    ref_commentAttr: ref_commentAttr,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

exports.updateReport = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const ref_user = req.body.ref_user;
  const ref_commentArticles = req.body.ref_commentArticles;
  const ref_commentAttr = req.body.ref_commentAttr;

  Report.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (!attr) {
        const message = "Le ticket n'existe pas";
        return res.status(404).json({ message });
      }

      Report.update(
        {
          title: title,
          description: description,
          ref_user: ref_user,
          ref_commentArticles: ref_commentArticles,
          ref_commentAttr: ref_commentAttr,
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

exports.deleteReport = (req, res, next) => {
  const id = req.params.id;

  Report.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (!attr) {
        const message = "Le ticket n'existe pas";
        return res.status(404).json({ message });
      }

      Report.destroy({
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
