module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Parc", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
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
    ticketPrice: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le prix ne peut pas être vide.",
        },
      },
    },
  });
};
