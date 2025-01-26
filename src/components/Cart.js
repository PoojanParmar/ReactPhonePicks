import React from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, dispatch } = useCart();

    // Function to handle quantity update
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return; // Prevent going below 1
        dispatch({ type: 'ADJUST_QUANTITY', productId, quantity });
    };

    // Function to remove an item from the cart
    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', productId });
    };

    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty. Add some items to get started!</p>
                    <Link to="/" className="continue-shopping">Continue Shopping</Link>
                </div>
            ) : (
                <div className="cart-items-container">
                    {cart.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p className="cart-item-price">${item.price}</p>

                                {/* Quantity Controls */}
                                <div className="quantity-container">
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        className="quantity-button"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                                        className="quantity-input"
                                    />
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        className="quantity-button"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="cart-item-total">Total: ${item.price * item.quantity}</p>
                                <button onClick={() => removeFromCart(item._id)} className="remove-from-cart-button">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Cart Summary */}
                    <div className="cart-summary">
                        <p><strong>Total Price:</strong> ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                        <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
