import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/food-order')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
