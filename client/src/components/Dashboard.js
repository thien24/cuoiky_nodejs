import React, { useEffect, useState } from 'react';
import axiosInstance from './axiosConfig';
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Thêm import useNavigate
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [foodList, setFoodList] = useState([]);
    const [newFood, setNewFood] = useState({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        category: '',
    });
    const [editingFood, setEditingFood] = useState(null);
    const navigate = useNavigate(); // Khởi tạo navigate

    // Lấy danh sách món ăn khi component được render
    useEffect(() => {
        axiosInstance
            .get('/foods')
            .then((response) => {
                setFoodList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleCreateFood = () => {
        axiosInstance
            .post('/foods', newFood)
            .then((response) => {
                // Lấy lại danh sách món ăn mới từ server
                axiosInstance
                    .get('/foods')
                    .then((response) => {
                        setFoodList(response.data); // Cập nhật lại danh sách món ăn
                    })
                    .catch((error) => {
                        console.error(error);
                        toast.error('Có lỗi khi lấy danh sách món ăn');
                    });
                toast.success('Món ăn đã được tạo thành công');
                setNewFood({
                    name: '',
                    price: '',
                    description: '',
                    imageUrl: '',
                    category: '',
                });
            })
            .catch((error) => {
                console.error(error);
                toast.error('Có lỗi khi tạo món ăn');
            });
    };

    const handleUpdateFood = (foodId) => {
        axiosInstance
            .put(`/foods/${foodId}`, editingFood)
            .then((response) => {
                // Lấy lại danh sách món ăn mới từ server sau khi cập nhật
                axiosInstance
                    .get('/foods')
                    .then((response) => {
                        setFoodList(response.data); // Cập nhật lại danh sách món ăn
                    })
                    .catch((error) => {
                        console.error(error);
                        toast.error('Có lỗi khi lấy danh sách món ăn');
                    });

                toast.success('Món ăn đã được cập nhật');
                setEditingFood(null);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Có lỗi khi cập nhật món ăn');
            });
    };

    // Xóa món ăn
    const handleDeleteFood = (foodId) => {
        axiosInstance
            .delete(`/foods/${foodId}`)
            .then((response) => {
                if (response.status === 200) {
                    setFoodList((prevFoods) =>
                        prevFoods.filter((food) => food._id !== foodId)
                    );
                    toast.success('Món ăn đã được xóa');
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error('Có lỗi khi xóa món ăn');
            });
    };

    const handleLogout = () => {
        // Xóa token và thông tin người dùng khỏi localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Chuyển hướng đến trang đăng nhập
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>

            <button className='logout' onClick={handleLogout}>Logout</button> {/* Nút logout */}

            {/* Giỏ hàng icon */}
            <div className="cart-icon" onClick={() => navigate('/cart')}>
                <FaShoppingCart size={30} />
            </div>

            <div className="food-form">
                <h3>Tạo món ăn mới</h3>
                <input
                    type="text"
                    placeholder="Tên món ăn"
                    value={newFood.name}
                    onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Giá tiền"
                    value={newFood.price}
                    onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Mô tả"
                    value={newFood.description}
                    onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="URL ảnh"
                    value={newFood.imageUrl}
                    onChange={(e) => setNewFood({ ...newFood, imageUrl: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Danh mục"
                    value={newFood.category}
                    onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                />
                <button onClick={handleCreateFood}>Tạo món ăn</button>
            </div>

            <div className="food-list">
                <h2>Danh sách món ăn</h2>
                {foodList.length > 0 ? (
                    <table className="food-table">
                        <thead>
                            <tr>
                                <th>Ảnh</th>
                                <th>Tên món ăn</th>
                                <th>Giá tiền</th>
                                <th>Mô tả</th>
                                <th>Danh mục</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodList.map((food) => (
                                <tr key={food._id}>
                                    {editingFood && editingFood._id === food._id ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editingFood.imageUrl}
                                                    onChange={(e) =>
                                                        setEditingFood({
                                                            ...editingFood,
                                                            imageUrl: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editingFood.name}
                                                    onChange={(e) =>
                                                        setEditingFood({
                                                            ...editingFood,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={editingFood.price}
                                                    onChange={(e) =>
                                                        setEditingFood({
                                                            ...editingFood,
                                                            price: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editingFood.description}
                                                    onChange={(e) =>
                                                        setEditingFood({
                                                            ...editingFood,
                                                            description: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editingFood.category}
                                                    onChange={(e) =>
                                                        setEditingFood({
                                                            ...editingFood,
                                                            category: e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <button onClick={() => handleUpdateFood(food._id)}>
                                                    Cập nhật
                                                </button>
                                                <button onClick={() => setEditingFood(null)}>Hủy</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>
                                                <img
                                                    src={food.imageUrl}
                                                    alt={food.name}
                                                    width="50"
                                                    height="50"
                                                />
                                            </td>
                                            <td>{food.name}</td>
                                            <td>{food.price} VND</td>
                                            <td>{food.description}</td>
                                            <td>{food.category}</td>
                                            <td>
                                                <button onClick={() => setEditingFood(food)}>Sửa</button>
                                                <button onClick={() => handleDeleteFood(food._id)}>
                                                    Xóa
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Không có món ăn nào.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
