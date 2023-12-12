module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Restaurant",
    {
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
            msg: "Le nom du restaurant ne peut pas être vide.",
          },
        },
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
      beginHour: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "L'heure de début ne peut pas être vide.",
          },
        },
      },
      endHour: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: {
            msg: "L'heure de fin ne peut pas être vide.",
          },
        },
      },
      carte_img: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'url de l'image ne peut pas être vide.",
          },
        },
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La description ne peut pas être vide.",
          },
        },
      },

      ref_parc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La référence de parc ne peut pas être vide.",
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
