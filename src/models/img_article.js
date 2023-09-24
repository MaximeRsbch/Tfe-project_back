module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Img_Article",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'url de l'image ne peut pas être vide.",
          },
        },
      },
      ref_article: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'url de l'image ne peut pas être vide.",
          },
        },
      },
    },
    {
      indexes: [
        {
          fields: ["ref_article"],
        },
      ],
    }
  );
};
