module.exports = (sequelize, DataTypes) => {
  return sequelize.define("TypeAttraction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le nom ne peut pas être vide.",
        },
      },
    },
  });
};
