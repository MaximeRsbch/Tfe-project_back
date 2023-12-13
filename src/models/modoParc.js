module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "modoParc",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "modoParc",
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: "Le nom est déjà pris.",
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "L'email est déjà pris.",
        },
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
          fields: ["ref_user", "ref_parc"],
        },
      ],
    }
  );
};
