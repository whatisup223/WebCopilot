const express = require('express');
const cors = require('cors');
require('dotenv').config();

// ====== Config & DB ======
const connectDB = require('./config/db');

// ====== Route Imports ======
const analyzeRoutes = require('./routes/analyze.routes');
const paymentRoutes = require('./routes/payment.routes');
const settingsRoutes = require('./routes/settings');

// ====== Initialization ======
const app = express();
connectDB(); // Attempts to connect to MongoDB

// ====== Middleware ======
app.use(cors());
app.use(express.json());

// ====== Mount Routes ======
app.use('/api/analyze', analyzeRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/settings', settingsRoutes);

// Base Route
app.get('/', (req, res) => {
    res.json({ message: 'Web Copilot API is running modularly...' });
});

// ====== Error Handling (Global) ======
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Server Error' });
});

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
