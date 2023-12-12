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
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "Le prix ne peut pas être vide.",
        },
      },
    },
    legende: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "La légende ne peut pas être vide.",
        },
      },
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "L'image ne peut pas être vide.",
        },
      },
    },
    showWC: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      validate: {
        notEmpty: {
          msg: "Le champ ne peut pas être vide.",
        },
      },
    },
    showResto: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      validate: {
        notEmpty: {
          msg: "Le champ ne peut pas être vide.",
        },
      },
    },

    showMagasins: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      validate: {
        notEmpty: {
          msg: "Le champ ne peut pas être vide.",
        },
      },
    },
    showCommentArticle: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  });
};
