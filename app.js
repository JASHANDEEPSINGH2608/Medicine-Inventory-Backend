const express = require('express');
const app = express();
const connectDB = require('./config/db');
const medicineRoutes = require('./routes/MedicineRoutes');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

app.use(express.json());
app.use('/api', medicineRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
