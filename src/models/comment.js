module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le contenu ne peut pas être vide.",
          },
        },
      },
      ref_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          fields: ["ref_user"],
        },
      ],
    }
  );
};
