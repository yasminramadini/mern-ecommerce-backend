"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.SalesItem, {
        as: "items",
        foreignKey: "salesId",
        onDelete: "CASCADE",
      });
      this.hasOne(models.Shipping, {
        as: "shipping",
        foreignKey: "salesId",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Sales.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
      accepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Sales",
    }
  );
  return Sales;
};
