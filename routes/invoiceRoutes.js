const express = require('express');
const { createInvoice, getInvoices } = require('../controllers/invoiceController');
const router = express.Router();

router.post('/invoices', createInvoice);
router.get('/invoices', getInvoices);

module.exports = router;
