const { User, Contact } = require("../db/sequelize");

exports.getAllContact = (req, res, next) => {
  const id = req.params.id;

  if (id) {
    Contact.findAll({
      where: {
        ref_user: id,
      },
      include: [
        {
          model: User,
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
    Contact.findAll()
      .then((rest) => {
        res.json(rest);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

exports.getContact = (req, res, next) => {
  Contact.findAll({
    include: [
      {
        model: User,
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

exports.createContact = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const ref_user = req.body.ref_user;

  Contact.create({
    id: id,
    title: title,
    description: description,
    ref_user: ref_user,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

exports.updateContact = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const ref_user = req.body.ref_user;

  Contact.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (!attr) {
        const message = "Le ticket n'existe pas";
        return res.status(404).json({ message });
      }

      Contact.update(
        {
          title: title,
          description: description,
          ref_user: ref_user,
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

exports.deleteContact = (req, res, next) => {
  const id = req.params.id;

  Contact.findOne({
    where: {
      id: id,
    },
  })
    .then((attr) => {
      if (!attr) {
        const message = "Le ticket n'existe pas";
        return res.status(404).json({ message });
      }

      Contact.destroy({
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
