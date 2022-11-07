"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Sales, {
        as: "sales",
        onDelete: "CASCADE",
        foreignKey: "salesId",
      });
    }
  }
  Shipping.init(
    {
      salesId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Sales",
          key: "id",
        },
      },
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shipping",
    }
  );
  return Shipping;
};
