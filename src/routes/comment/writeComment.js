const { Comment } = require("../../db/sequelize");
const auth = require("../../auth/auth.js");

module.exports = (app) => {
  app.post("/api/comment", (req, res) => {
    Comment.create({
      content: req.body.content,
      canComment: true,
    })
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
};
