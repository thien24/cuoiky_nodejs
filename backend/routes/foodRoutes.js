import express from 'express';
import { createFood, getFoods, updateFood, deleteFood } from '../controllers/foodController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, admin, createFood);

router.get('/', protect, getFoods);

router.put('/:id', protect, admin, updateFood);

router.delete('/:id', protect, admin, deleteFood);

export default router;
