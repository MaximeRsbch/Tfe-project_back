module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ImageAttraction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url_img: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le rating ne peut pas être vide.",
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
