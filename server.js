const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./models/index');
const invoiceRoutes = require('./routes/invoiceRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', invoiceRoutes);
app.use('/api', productRoutes);


sequelize.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
