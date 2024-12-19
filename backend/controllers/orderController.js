import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
    try {
        const order = await Order.create({ user: req.user.id, food: req.body.food });
        res.status(201).json({ message: 'Order created', order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getOrders = async (req, res) => {
    const orders = await Order.find().populate('user food');
    res.status(200).json(orders);
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteOrders = async (req, res) => {
    try {
        const { ids } = req.body; // Danh sách ID các đơn hàng cần xóa
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'Danh sách ID không hợp lệ' });
        }

        // Xóa tất cả đơn hàng có ID trong danh sách
        await Order.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Xóa đơn hàng thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

