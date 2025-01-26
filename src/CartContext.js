import React, { createContext, useReducer, useContext } from 'react';

// Create the CartContext
const CartContext = createContext();

// Define the reducer function for managing the cart state
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            // Check if the product already exists in the cart, if it does, update the quantity
            const existingProductIndex = state.findIndex(item => item._id === action.product._id);
            if (existingProductIndex >= 0) {
                const updatedCart = [...state];
                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            } else {
                // If the product does not exist, add it to the cart with quantity 1
                return [...state, { ...action.product, quantity: 1 }];
            }

        case 'REMOVE_FROM_CART':
            // Filter out the product to be removed
            return state.filter((item) => item._id !== action.productId);

        case 'ADJUST_QUANTITY':
            // Find the product and adjust its quantity
            return state.map((item) =>
                item._id === action.productId
                    ? { ...item, quantity: action.quantity }
                    : item
            );

        case 'CLEAR_CART':
            // Clear all items in the cart
            return [];

        default:
            return state;
    }
};

// Create a provider component for CartContext
export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);
