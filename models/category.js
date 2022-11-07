"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Product, {
        as: "products",
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
    }
  );
  return Category;
};
