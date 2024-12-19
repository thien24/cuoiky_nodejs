import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    food: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true }],
    status: { type: String, enum: ['Pending', 'Success'], default: 'Pending' },
});

export default mongoose.model('Order', orderSchema);
