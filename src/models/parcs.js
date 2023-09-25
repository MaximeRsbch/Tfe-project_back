module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Parc", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.String,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "L'heure de début ne peut pas être vide.",
        },
      },
    },
    endHour: {
      type: DataTypes.String,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "L'heure de fin ne peut pas être vide.",
        },
      },
    },
    localisation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La localisation ne peut pas être vide.",
        },
      },
    },
    ticketPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le prix ne peut pas être vide.",
        },
      },
    },
  });
};
