import React, { useEffect, useState } from 'react';
import '../components/css/cart.css';
import Loading from "../components/global/loading";
import axiosInstance from "../util/axiosInstance";

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null); // Initialize userId state

    useEffect(() => {
        const fetchUserId = async () => {
            const email = localStorage.getItem("email"); // Retrieve user's email from local storage
            try {
                const response = await axiosInstance.get(`/users/id?email=${email}`);
                if (response.data.status === "SUCCESS") {
                    setUserId(response.data.data); // Set user ID from response
                } else {
                    setError("Could not fetch user ID.");
                }
            } catch (error) {
                console.error("Error fetching user ID:", error);
                setError("Error fetching user ID.");
            }
        };

        fetchUserId();
    }, []); // Run this effect only once when the component mounts

    useEffect(() => {
        const fetchCart = async () => {
            if (userId === null) return; // Wait until userId is fetched
            try {
                setLoading(true); // Set loading to true before API call
                const response = await axiosInstance.get(`/api/cart?userId=${userId}`);

                if (response.status !== 200) {
                    setError(`Unexpected response status: ${response.status}`);
                    return;
                }

                if (response.data.status === "SUCCESS") {
                    setCart(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                if (err.response) {
                    setError(`Error: ${err.response.data.message || "An error occurred"}`);
                } else {
                    setError(`Network Error: ${err.message}`);
                }
            } finally {
                setLoading(false); // Set loading to false after API call completes
            }
        };

        fetchCart();
    }, [userId]); // Fetch cart when userId is set

    // Loading state
    if (loading) return <Loading />;

    // Error state
    if (error) return <div>Error: {error}</div>;

    // Cart is empty
    if (cart && cart.cartItems.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart && (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Image</th>
                                <th>Price at Time</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.cartItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <img 
                                            // src={item.imageUrl} 
                                            src="https://picsum.photos/id/1/50/50"
                                            alt={item.name} 
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                        />
                                    </td>
                                    <td>${item.priceAtTime.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>${(item.priceAtTime * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h5>
                        Total Price: $
                        {cart.cartItems.reduce((total, item) => total + (item.priceAtTime * item.quantity), 0).toFixed(2)}
                    </h5>
                </div>
            )}
        </div>
    );
}

export default Cart;