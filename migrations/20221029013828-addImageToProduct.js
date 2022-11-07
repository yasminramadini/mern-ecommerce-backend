"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Products", "image", {
      type: DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Products", "image");
  },
};
