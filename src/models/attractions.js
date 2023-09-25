module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Attraction",
    {
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
      minHeight: {
        type: DataTypes.String,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La taille minimum ne peut pas être vide.",
          },
        },
      },
      maxHeight: {
        type: DataTypes.String,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La taille maximale ne peut pas être vide",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La description ne peut pas être vide.",
          },
        },
      },
      ref_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La référence de type ne peut pas être vide.",
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
          fields: ["ref_type", "ref_parc"],
        },
      ],
    }
  );
};
