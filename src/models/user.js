module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    canComment: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    password: {
      type: DataTypes.STRING,
    },
  });
};
