import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from './api.js';
import './Checkout.css';

const Checkout = () => {
    const { cart, dispatch } = useCart();
    const [form, setForm] = useState({ name: '', email: '', address: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            ...form,
            items: cart.map(item => ({ productId: item._id, quantity: item.quantity })),
            totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0)
        };

        try {
            const newOrder = await createOrder(order);
            dispatch({ type: 'CLEAR_CART' });
            navigate(`/order-confirmation/${newOrder._id}`);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                <button type="submit">Submit Order</button>
            </form>
            <div className="order-summary">
                <h3>Order Summary</h3>
                {cart.map((item) => (
                    <div key={item._id} className="order-item">
                        <span>{item.name}</span>
                        <span>{item.quantity} x ${item.price}</span>
                    </div>
                ))}
                <div className="order-total">
                    <span>Total:</span>
                    <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
