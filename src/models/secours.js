module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Secours",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La localisation ne peut pas être vide.",
          },
        },
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La localisation ne peut pas être vide.",
          },
        },
      },
      ref_parc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La référence du parc ne peut pas être vide.",
          },
        },
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          fields: ["ref_parc"],
        },
      ],
    }
  );
};
