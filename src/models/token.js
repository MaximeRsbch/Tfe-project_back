module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Token", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ref_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le token ne peut pas être vide.",
        },
      },
    },
  });
};
