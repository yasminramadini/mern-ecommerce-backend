"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {
        onDelete: "SET NULL",
        as: "category",
        foreignKey: "categoryId",
      });
      this.hasMany(models.SalesItem, {
        onDelete: "CASCADE",
        as: "salesItem",
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Category",
          key: "id",
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      discount: DataTypes.INTEGER,
      description: {
        type: DataTypes.TEXT,
      },
      image: DataTypes.STRING,
      image_path: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${process.env.URL}/images/${this.image}`;
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
