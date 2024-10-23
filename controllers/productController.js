const { Op } = require('sequelize');
const { Product } = require('../models');

exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.query; 

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%` 
        }
      }
    });

    res.status(200).json(products); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
