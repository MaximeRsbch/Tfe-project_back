module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le rating ne peut pas être vide.",
          },
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le contenu ne peut pas être vide.",
          },
        },
      },
      ref_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ref_attraction: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          fields: ["ref_user", "ref_attraction"],
        },
      ],
    }
  );
};
