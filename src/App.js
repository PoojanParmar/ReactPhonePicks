import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import { CartProvider } from './CartContext';
import './App.css';
import AccountPage from './components/AccountPage';
import LoginModal from './components/LoginModal';  // Import the LoginModal

function App() {
    const [showLoginModal, setShowLoginModal] = useState(false);  // State to toggle the login modal
    const [user, setUser] = useState(null); // State to manage user session

    const handleLogout = () => {
        setUser(null); // Clear user session
        alert('You have logged out successfully.'); // User feedback
    };

    return (
        <CartProvider>
            <Router>
                <div className="App">
                    {/* Navbar */}
                    <nav className="navbar">
                        <div className="navbar-logo">
                            <Link to="/">PhonePicks</Link>
                        </div>
                        <ul className="navbar-links">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/cart">Cart</Link>
                            </li>
                            <li>
                                <Link to="/account">Account</Link>
                            </li>
                        </ul>
                        <div className="navbar-actions">
                            {user ? (
                                <button onClick={handleLogout} className="navbar-logout-btn">
                                    Logout
                                </button>
                            ) : (
                                <button onClick={() => setShowLoginModal(true)} className="navbar-login-btn">
                                    Login
                                </button>
                            )}
                        </div>
                    </nav>

                    {/* Main Content Area */}
                    <main className="main-content">
                        <div className="content-wrapper">
                            {/* Routes and Content */}
                            <section className="content">
                                <Routes>
                                    <Route path="/" element={<ProductList />} />
                                    <Route path="/account" element={<AccountPage />} />
                                    <Route path="/product/:id" element={<ProductDetails />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                                    <Route path="/cart" element={<Cart />} />
                                </Routes>
                            </section>
                        </div>
                    </main>

                    {/* Show the Login Modal when state is true */}
                    {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} setUser={setUser} />}
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
