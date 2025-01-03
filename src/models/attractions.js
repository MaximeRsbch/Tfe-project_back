module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Attraction",
    {
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
      minHeight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La taille minimum ne peut pas être vide.",
          },
        },
      },
      maxHeight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La taille maximale ne peut pas être vide",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La description ne peut pas être vide.",
          },
        },
      },
      is_open: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      wait_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      isFavorite: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      showCommentaires: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
