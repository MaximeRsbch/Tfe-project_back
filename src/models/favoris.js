module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Favoris",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      ref_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La référence de l'user ne peut pas être vide.",
          },
        },
      },
      ref_attraction: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La référence de l'attraction ne peut pas être vide.",
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
