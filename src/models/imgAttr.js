module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ImageAttraction",
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
      ref_attraction: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          fields: ["ref_attraction"],
        },
      ],
    }
  );
};
