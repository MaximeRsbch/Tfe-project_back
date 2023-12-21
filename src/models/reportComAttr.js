module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "reportComAttr",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le titre ne peut pas être vide.",
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

      ref_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La référence de l'utilisateur ne peut pas être vide.",
          },
        },
      },

      ref_commentAttr: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          fields: ["ref_user", "ref_commentAttr"],
        },
      ],
    }
  );
};
