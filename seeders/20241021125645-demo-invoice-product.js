'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const invoiceProductsPath = path.resolve(__dirname, '../json/invoice-products.json');
    const invoiceProducts = JSON.parse(fs.readFileSync(invoiceProductsPath, 'utf8'));

    const records = invoiceProducts.map(item => ({
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('InvoiceProduct', records, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('InvoiceProduct', null, {});
  }
};
