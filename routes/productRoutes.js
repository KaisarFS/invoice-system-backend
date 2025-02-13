const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/productController');

router.get('/products', searchProducts);

module.exports = router;
