const { User, ReportComAttr, Review } = require("../db/sequelize");

exports.getAllReportAttr = (req, res, next) => {
  ReportComAttr.findAll({
    include: [
      {
        model: User,
      },
      {
        model: Review,
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

exports.getReportAttr = (req, res, next) => {
  ReportComAttr.findAll({
    include: [
      {
        model: User,
      },
      {
        model: Review,
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

exports.createReportAttr = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const ref_user = req.body.ref_user;
  const ref_review = req.body.ref_review;

  ReportComAttr.create({
    id: id,
    title: title,
    description: description,
    ref_user: ref_user,
    ref_review: ref_review,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};

exports.deleteReportAttr = (req, res, next) => {
  ReportComAttr.destroy({
    where: { id: req.params.id },
  })
    .then(() => res.status(200).json({ message: "Report deleted !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateReportAttr = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const ref_user = req.body.ref_user;
  const ref_review = req.body.ref_review;

  ReportComAttr.update(
    {
      id: id,
      title: title,
      description: description,
      ref_user: ref_user,
      ref_review: ref_review,
    },
    { where: { id: id } }
  )
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err.message });
    });
};
