import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const { cart, dispatch } = useCart();
    const [form, setForm] = useState({ name: '', email: '', address: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation for form inputs
        if (!form.name || !form.email || !form.address) {
            alert('Please fill in all fields.');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(form.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Here you can handle the order submission logic without API call
        alert('Order submitted successfully!'); // Placeholder for order submission
        dispatch({ type: 'CLEAR_CART' });
        navigate('/order-confirmation'); // Navigate to confirmation page
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
