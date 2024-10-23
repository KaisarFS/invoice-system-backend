'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoice.belongsToMany(models.Product, {
        through: 'InvoiceProduct',
        foreignKey: 'invoiceId',
        otherKey: 'productId',
        as: 'products'
      });
    }
  }
  Invoice.init({
    date: DataTypes.DATE,
    customerName: DataTypes.STRING,
    salespersonName: DataTypes.STRING,
    notes: DataTypes.TEXT,
    paymentType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};
