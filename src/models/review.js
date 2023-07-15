module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Review", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le rating ne peut pas être vide.",
        },
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le commentaire ne peut pas être vide.",
        },
      },
    },
  });
};
