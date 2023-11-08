module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ParcCalendar",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      day: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le titre ne peut pas être vide.",
          },
        },
      },
      beginHour: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'heure de début ne peut pas être vide.",
          },
        },
      },
      endHour: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'heure de fin ne peut pas être vide.",
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
