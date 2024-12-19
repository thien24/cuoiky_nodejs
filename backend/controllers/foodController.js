import Food from '../models/foodModel.js';

export const createFood = async (req, res) => {
    try {
        const food = await Food.create(req.body);
        res.status(201).json({ message: 'Food created successfully', food });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getFoods = async (req, res) => {
    const foods = await Food.find();
    res.status(200).json(foods);
};

export const updateFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Food updated successfully', food });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteFood = async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Food deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
