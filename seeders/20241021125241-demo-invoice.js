'use strict';
const fs = require('fs');
const path = require('path');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.resolve(__dirname, '../json/invoice.json');

    const invoiceData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const invoices = invoiceData.map(invoice => ({
      ...invoice,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Invoices', invoices, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Invoices', null, {});
  }
};
