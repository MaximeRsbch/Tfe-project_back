const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize.js");
const cors = require("cors");

const app = express();
const port = 3000;

const throughMiddleware = require("./src/middlewares/TroughMiddleware.js");

const authRouter = require("./src/router/authRouter.js");
const queuetimeRouter = require("./src/router/queuetimeRouter.js");
const mapboxRouter = require("./src/router/mapboxRouter.js");
const commentArtRouter = require("./src/router/commentArtRouter.js");
const commentAttrRouter = require("./src/router/commentAttrRouter.js");
const usersRouter = require("./src/router/usersRouter.js");
const parcRouter = require("./src/router/parcsRouter.js");
const articleRouter = require("./src/router/articlesRouter.js");
const attractionRouter = require("./src/router/attractionsRouter.js");
const typeAttrRouter = require("./src/router/typesAttractionRouter.js");

global.__basedir = __dirname;

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
  .use("/api", throughMiddleware.throughMiddleware)
  .use("/api/queuetime", queuetimeRouter) // à delete
  .use("/api/mapbox", mapboxRouter)
  .use("/api/auth", authRouter)
  .use("/api/commentsart", commentArtRouter)
  .use("/api/commentsattr", commentAttrRouter)
  .use("/api/users", usersRouter)
  .use("/api/parcs", parcRouter)
  .use("/api/articles", articleRouter)
  .use("/api/attractions", attractionRouter)
  .use("/api/typesattr", typeAttrRouter)
  .use("/api/auth", authRouter);

sequelize.initDb();

app.use((req, res) => {
  const message = `Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.`;
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
