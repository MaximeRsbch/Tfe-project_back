const { User } = require("../db/sequelize.js");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key.js");
const dotenv = require("dotenv");
dotenv.config();

exports.throughMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    req.userId = null;
    req.userRole = "visitor";
    next();
  } else {
    const bearer = token.split(" ");
    if (bearer.length !== 2 || bearer[0] !== "Bearer") {
      return res.status(401).json({ error: "Le token est invalide" });
    }

    const tokenValue = bearer[1];
    const jwtSecret = privateKey;

    jwt.verify(tokenValue, jwtSecret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Token expiré" });
        } else {
          return res.status(400).json({ error: "Token invalide" });
        }
      }

      req.userId = decoded.id_user;
      req.userRole = decoded.role;
      next();
    });
  }
};
