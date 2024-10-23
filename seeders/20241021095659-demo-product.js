'use strict';
const fs = require('fs');
const path = require('path');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productsFilePath = path.join(__dirname, '../json/products.json');
    const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

    const products = productsData.map((product) => ({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    return queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
