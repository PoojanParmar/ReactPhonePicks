import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from './api.js';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const fetchedOrder = await getOrderById(id);
                setOrder(fetchedOrder);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-confirmation">
            <h2>Order Confirmation</h2>
            <p>Thank you for your purchase, {order.name}!</p>
            <p>Order ID: {order._id}</p>
            <p>Email: {order.email}</p>
            <p>Address: {order.address}</p>
            <h3>Order Summary</h3>
            <ul>
                {order.items.map((item) => (
                    <li key={item._id}>
                        {item.productId.name} - {item.quantity} x ${item.productId.price}
                    </li>
                ))}
            </ul>
            <h3>Total Amount: ${order.totalAmount}</h3>
        </div>
    );
};

export default OrderConfirmation;
