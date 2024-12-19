import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from './axiosConfig';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // Fetch food list
        const fetchFoods = async () => {
            try {
                const response = await axios.get('/foods');
                setFoods(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu món ăn', error);
            }
        };

        // Get user data from localStorage
        const currentUser = JSON.parse(localStorage.getItem('user'));
        setUser(currentUser);

        fetchFoods();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Clear user info from localStorage
        setUser(null); // Update state
        toast.success('Bạn đã đăng xuất thành công!');
        navigate('/login'); // Redirect to login page
    };

    const handleOrder = (foodId) => {
        if (!user) {
            toast.error('Bạn cần đăng nhập để đặt món!');
            return;
        }

        const payload = {
            userId: user.id,
            food: [foodId],
        };

        console.log('Payload gửi lên:', payload);

        axios.post('/orders', payload)
            .then((response) => {
                console.log('Đặt món thành công:', response.data);
                toast.success('Đặt món thành công');
            })
            .catch((error) => {
                console.error('Chi tiết lỗi:', error.response ? error.response.data : error.message);
                toast.error(`Lỗi: ${error.response?.data?.message || 'Có lỗi xảy ra'}`);
            });
    };

    return (
        <FoodListContainer>
            <Header>
                <h1>Danh sách món ăn</h1>
                {user && (
                    <LogoutButton onClick={handleLogout}>
                        Logout
                    </LogoutButton>
                )}
            </Header>
            <FoodListWrapper>
                {foods.map((food) => (
                    <FoodCard key={food._id}>
                        <FoodImage src={food.imageUrl} alt={food.name} />
                        <FoodInfo>
                            <h2>{food.name}</h2>
                            <Category>{food.category}</Category>
                            <p>{food.description}</p>
                            <Price>{food.price} VND</Price>
                            <OrderButton onClick={() => handleOrder(food._id)}>
                                Đặt món
                            </OrderButton>
                        </FoodInfo>
                    </FoodCard>
                ))}
            </FoodListWrapper>
        </FoodListContainer>
    );
};

export default FoodList;


// Styled Components

const FoodListContainer = styled.div`
    padding: 20px;
    text-align: center;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
        margin: 0;
    }
`;

const FoodListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    justify-items: center;
`;

const FoodCard = styled.div`
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    max-width: 300px;
    text-align: left;
    padding: 20px;
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-5px);
    }
`;

const FoodImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
`;

const FoodInfo = styled.div`
    h2 {
        font-size: 20px;
        font-weight: bold;
        margin: 10px 0;
    }

    p {
        font-size: 16px;
        margin-bottom: 10px;
    }
`;

const Category = styled.p`
    font-style: italic;
    color: #555;
`;

const Price = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #e74c3c;
`;

const OrderButton = styled.button`
    background-color: #3498db;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2980b9;
    }
`;

const LogoutButton = styled.button`
    background-color: #e74c3c;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c0392b;
    }
`;
