const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
    res.send('Online Recharge Portal Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
