import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsPage from './CommentsPage';  // Import the CommentsPage component
import './ProductDetails.css';

const ProductDetails = ({ user }) => {  // Assuming `user` is passed from the parent component
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const products = [
            {
                _id: '1',
                name: 'iphone 16 Pro',
                category: 'iphone',
                price: 2100.0,
                description: 'This is a iphone 16 pro',
                imageUrl: '/images/16_pro.webp',
            },
            {
                _id: '2',
                name: 'iphone 15 Pro',
                category: 'iphone',
                price: 1800.0,
                description: 'This is iphone 15 Pro',
                imageUrl: '/images/15_pro.jpg',
            },
            {
                _id: '3',
                name: 'iphone 14 Pro',
                category: 'iphone',
                price: 1500.0,
                description: 'This is iphone 14 Pro',
                imageUrl: '/images/14_pro.jpg',
            },
            {
                _id: '4',
                name: 'Samsung S24',
                category: 'Samsung',
                price: 1900.0,
                description: 'This is Samsung s24 ',
                imageUrl: '/images/s24.png',
            },
            {
                _id: '5',
                name: 'Pixel 9',
                category: 'Pixel',
                price: 800.0,
                description: 'This is Pixel 9',
                imageUrl: '/images/pixel_9.webp',
            },
            {
                _id: '6',
                name: 'Huawei',
                category: 'Huawei',
                price: 1400.0,
                description: 'This is Huawei',
                imageUrl: '/images/huawei.png',
            },
            {
                _id: '7',
                name: 'Nothing',
                category: 'Nothing',
                price: 700.0,
                description: 'This is the nothing phone',
                imageUrl: '/images/nothing.webp',
            },
        ];

        // Find the product by ID from the list
        const foundProduct = products.find(p => p._id === id);
        setProduct(foundProduct);
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>

            {/* Comments section */}
            <div className="comments-section">
                <h3>Leave a Comment</h3>
                <CommentsPage product={product} user={user} /> {/* Pass the product and user as props to CommentsPage */}
            </div>
        </div>
    );
};

export default ProductDetails;
