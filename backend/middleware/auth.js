import jwt from 'jsonwebtoken';

const JWT_SECRET = 'YOUR_JWT_SECRET';

// Tạo JWT Token
export const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

// Xác thực JWT Token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
};

// Middleware: Bảo vệ route (yêu cầu đăng nhập)
export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
        return res.status(401).json({ error: 'khong duoc phep' });
    }

    req.user = decoded;
    next();
};

// Middleware: Chỉ cho phép admin
export const admin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Truy cap bi tu choi' });
    }
    next();
};
