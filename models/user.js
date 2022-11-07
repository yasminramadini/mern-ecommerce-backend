"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Sales, {
        as: "sales",
        onDelete: "CASCADE",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
