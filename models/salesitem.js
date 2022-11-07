"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SalesItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Sales, {
        as: "sales",
        foreignKey: "salesId",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  SalesItem.init(
    {
      salesId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      subtotal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SalesItem",
    }
  );
  return SalesItem;
};
