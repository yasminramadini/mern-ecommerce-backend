"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Categories", "slug", {
      type: DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Categories", "slug");
  },
};
