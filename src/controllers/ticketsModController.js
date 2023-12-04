const { User, CommentArticles, CommentAttr } = require("../db/sequelize");

exports.getAllTicketsMod = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    TicketsMod.findAll({
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
    TicketsMod.findAll()
      .then((rest) => {
        res.json(rest);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

exports.createTicketsMod = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const ref_user = req.body.ref_user;
  const ref_commentArticles = req.body.ref_commentArticles;
  const ref_commentAttr = req.body.ref_commentAttr;

  TicketsMod.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (attr) {
        const message = "Le ticket existe déjà";
        return res.status(409).json({ message });
      }

      TicketsMod.create({
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
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

exports.updateTicketsMod = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const ref_user = req.body.ref_user;
  const ref_commentArticles = req.body.ref_commentArticles;
  const ref_commentAttr = req.body.ref_commentAttr;

  TicketsMod.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (!attr) {
        const message = "Le ticket n'existe pas";
        return res.status(404).json({ message });
      }

      TicketsMod.update(
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

exports.deleteTicketsMod = (req, res, next) => {
  const id = req.params.id;

  TicketsMod.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (!attr) {
        const message = "Le ticket n'existe pas";
        return res.status(404).json({ message });
      }

      TicketsMod.destroy({
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
