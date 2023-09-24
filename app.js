const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize.js");
const cors = require("cors");

const app = express();
const port = 3000;

const queuetimeRouter = require("./src/router/queuetimeRouter.js");
const mapboxRouter = require("./src/router/mapboxRouter.js");
const authRouter = require("./src/router/authRouter.js");
const commentRouter = require("./src/router/commentRouter.js");
const usersRouter = require("./src/router/usersRouter.js");

app.use(morgan("dev"));

const corsConf = {
  origin: "*",
  Credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionSuccessStatus: 200,
};

app
  .use(bodyParser.json())
  .use(cors(corsConf))
  .use("/api/queuetime", queuetimeRouter)
  .use("/api/mapbox", mapboxRouter)
  .use("/api/auth", authRouter)
  .use("/api/comments", commentRouter)
  .use("/api/users", usersRouter);

sequelize.initDb();

// //Ici, nous placerons nos futurs points de terminaisons.

// //Points de terminaisons pour les utilisateurs
// require("./src/routes/user/login.js")(app);
// require("./src/routes/user/createUser.js")(app);
// require("./src/routes/user/findAllUsers.js")(app);
// require("./src/routes/user/findOneUser.js")(app);
// require("./src/routes/user/deleteOneUser.js")(app);
// require("./src/routes/user/oneUserCantComment.js")(app);
// require("./src/routes/user/ModifyUser.js")(app);

// //Points de terminaisons pour les commentaires
// require("./src/routes/comment/writeComment.js")(app);
// require("./src/routes/comment/findAllComments.js")(app);
// require("./src/routes/comment/deleteOneComments.js")(app);

// //Points de terminaisons pour la map et attractions
// require("./src/routes/queutime/queuetime.js")(app);
// require("./src/routes/mapbox/mapbox.js")(app);

// On ajoute la gestions des erreurs 404

app.use(({ res }) => {
  const message = `Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.`;
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
