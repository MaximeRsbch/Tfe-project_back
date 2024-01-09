const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize.js");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3306;

const RateLimit = require("express-rate-limit");
const limiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // limit each IP to 100 requests per windowMs
});

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
const reviewRouter = require("./src/router/reviewRouter.js");
const restaurantRouter = require("./src/router/restaurantRouter.js");
const toilettesRouter = require("./src/router/toilettesRouter.js");
const magasinsRouter = require("./src/router/magasinsRouter.js");
const ContactRouter = require("./src/router/contactRouter.js");
const ReportArticleRouter = require("./src/router/reportArticleRouter.js");
const ReportAttractionRouter = require("./src/router/reportAttractionRouter.js");
const EvenementRouter = require("./src/router/evenementRouter.js");
const FavorisRouter = require("./src/router/favorisRouter.js");
const SecoursRouter = require("./src/router/secoursRouter.js");
const InfoRouter = require("./src/router/infoRouter.js");
const ModoParcRouter = require("./src/router/modoParcRouter.js");
const ModoRouter = require("./src/router/modoRouter.js");

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
  .use(limiter)
  .use(bodyParser.json())
  .use(cors(corsConf))
  .use("/public", express.static("public"))
  .use("/api", throughMiddleware.throughMiddleware)
  .use("/api/queuetime", queuetimeRouter) // à delete
  .use("/api/mapbox", mapboxRouter)
  .use("/api/auth", authRouter)
  .use("/api/commentsart", commentArtRouter)
  .use("/api/commentsattr", commentAttrRouter)
  .use("/api/users", usersRouter)
  .use("/api/parcs", parcRouter)
  .use("/api/articles", articleRouter)
  .use("/api/reviews", reviewRouter)
  .use("/api/attractions", attractionRouter)
  .use("/api/typesattr", typeAttrRouter)
  .use("/api/restaurants", restaurantRouter)
  .use("/api/toilettes", toilettesRouter)
  .use("/api/magasins", magasinsRouter)
  .use("/api/contact", ContactRouter)
  .use("/api/reportArt", ReportArticleRouter)
  .use("/api/reportAttr", ReportAttractionRouter)
  .use("/api/evenements", EvenementRouter)
  .use("/api/favoris", FavorisRouter)
  .use("/api/info", InfoRouter)
  .use("/api/secours", SecoursRouter)
  .use("/api/modoparc", ModoParcRouter)
  .use("/api/modo", ModoRouter)
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
