module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Favoris",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ref_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'id de l'utilisateur ne peut pas être vide.",
          },
        },
      },
      ref_attraction: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'id de l'évènement ne peut pas être vide.",
          },
        },
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          fields: ["ref_user", "ref_attraction"],
        },
      ],
    }
  );
};
