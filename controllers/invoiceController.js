const { Invoice, Product } = require('../models');

exports.createInvoice = async (req, res) => {
  try {
    const { date, customerName, salespersonName, notes, products, paymentType } = req.body;

    if (!date || !customerName || !salespersonName || !products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        error: 'Validation failed: Please provide a valid date, customer name, salesperson name, at least one product, and payment type.'
      });
    }

    if (isNaN(Date.parse(date))) {
      return res.status(400).json({
        error: 'Validation failed: Invalid date format.'
      });
    }

    const productInstances = await Product.findAll({
      where: { id: products },
    });

    if (productInstances.length !== products.length) {
      return res.status(400).json({
        error: 'Validation failed: One or more products are invalid, please check your product IDs.'
      });
    }

    const invoice = await Invoice.create({ date, customerName, salespersonName, notes, paymentType }); // Add paymentType here
    await invoice.addProducts(productInstances);

    res.status(201).json({ message: 'Invoice created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const invoices = await Invoice.findAndCountAll({
      include: [{
        model: Product,
        as: 'products'
      }],
      limit: limit,
      offset: offset,
    });

    res.status(200).json({
      totalInvoices: invoices.count,
      totalPages: Math.ceil(invoices.count / limit),
      currentPage: Math.floor(offset / limit) + 1,
      invoices: invoices.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
