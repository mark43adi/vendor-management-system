require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const vendorRoutes = require('./routes/vendorRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 