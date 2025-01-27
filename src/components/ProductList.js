import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './ProductList.css';

const ProductList = ({ selectedCategory, user }) => {
  const products = [
    {
        _id: '1',
        name: 'iphone 16 Pro',
        category: 'iphone',
        price: 2100.0,
        description: 'This is an iphone 16 Pro',
        imageUrl: '/images/16_pro.webp',
        comments: [
            { username: 'Arjun', text: 'Amazing phone! Totally worth it.' },
            { username: 'Priya', text: 'The camera quality is superb.' },
        ],
    },
    {
        _id: '2',
        name: 'iphone 15 Pro',
        category: 'iphone',
        price: 1800.0,
        description: 'This is iphone 15 Pro',
        imageUrl: '/images/15_pro.jpg',
        comments: [
            { username: 'Rahul', text: 'Still a great option for the price.' },
            { username: 'Sneha', text: 'Battery life could be better.' },
        ],
    },
    {
        _id: '3',
        name: 'iphone 14 Pro',
        category: 'iphone',
        price: 1500.0,
        description: 'This is iphone 14 Pro',
        imageUrl: '/images/14_pro.jpg',
        comments: [
            { username: 'Vikram', text: 'Good performance for an older model.' },
        ],
    },
    {
        _id: '4',
        name: 'Samsung S24',
        category: 'Samsung',
        price: 1900.0,
        description: 'This is Samsung S24',
        imageUrl: '/images/s24.png',
        comments: [
            { username: 'Rohit', text: 'Fantastic display and features!' },
            { username: 'Anjali', text: 'I love the design and performance.' },
        ],
    },
    {
        _id: '5',
        name: 'Pixel 9',
        category: 'Pixel',
        price: 800.0,
        description: 'This is Pixel 9',
        imageUrl: '/images/pixel_9.webp',
        comments: [
            { username: 'Meera', text: 'Great camera for the price!' },
        ],
    },
    {
        _id: '6',
        name: 'Huawei',
        category: 'Huawei',
        price: 1400.0,
        description: 'This is Huawei',
        imageUrl: '/images/huawei.png',
        comments: [
            { username: 'Karan', text: 'An underrated gem in the market.' },
        ],
    },
    {
        _id: '7',
        name: 'Nothing',
        category: 'Nothing',
        price: 700.0,
        description: 'This is the Nothing Phone',
        imageUrl: './images/nothing.webp',
        comments: [
            { username: 'Ayesha', text: 'Innovative design. Really like it!' },
            { username: 'Ishaan', text: 'Great for minimalists.' },
        ],
    },
];


  const { cart, dispatch } = useCart();
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product._id] = 1;
      return acc;
    }, {})
  );
  const [isAdded, setIsAdded] = useState(null);
  const [visibleComments, setVisibleComments] = useState({}); // Track visibility of comments for each product

  const handleQuantityChange = (e, productId) => {
    const quantity = Math.max(1, parseInt(e.target.value) || 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));

    const productInCart = cart.find((item) => item._id === productId);
    if (productInCart) {
      dispatch({ type: 'ADJUST_QUANTITY', productId, quantity });
    }
  };

  const addToCart = (product) => {
    const quantity = quantities[product._id];
    if (quantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', product: { ...product, quantity } });

    // Set the "added to cart" effect
    setIsAdded(product._id);

    // Reset the "added" state after 1 second
    setTimeout(() => {
      setIsAdded(null);
    }, 1000);
  };

  const toggleComments = (productId) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId], // Toggle visibility for the specific product
    }));
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="product-list">
      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="products-container">
          {filteredProducts.map((product) => (
            <div key={product._id} className={`product-card ${isAdded === product._id ? 'added-to-cart' : ''}`}>
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>

                <div className="quantity-container">
                  <input
                    type="number"
                    min="1"
                    value={quantities[product._id]}
                    onChange={(e) => handleQuantityChange(e, product._id)}
                    className="quantity-input"
                  />
                  <span>Qty</span>
                </div>

                <Link to={`/product/${product._id}`} className="view-details-button">
                  View Details
                </Link>

                <button onClick={() => addToCart(product)} className={`add-to-cart-button ${isAdded === product._id ? 'added' : ''}`}>
                  {isAdded === product._id ? 'Added' : 'Add to Cart'}
                </button>

                {/* Comments Section */}
                <button onClick={() => toggleComments(product._id)} className="view-comments-button">
                  {visibleComments[product._id] ? 'Hide Comments' : 'View Comments'}
                </button>

                {visibleComments[product._id] && (
                  <div className="comments-section">
                    <h4>Comments:</h4>
                    <ul>
                      {product.comments.map((comment, index) => (
                        <li key={index} className="comment-item">
                          <strong>{comment.username}:</strong> {comment.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
