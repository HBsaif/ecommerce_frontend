import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import '../components/css/cart.css';
import axiosInstance from "../util/axiosInstance";
import Loader from './global/loader';

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loadingItems, setLoadingItems] = useState({}); // Track loading states for individual items

    useEffect(() => {
        const fetchUserId = async () => {
            const email = localStorage.getItem("email");
            try {
                const response = await axiosInstance.get(`/users/id?email=${email}`);
                if (response.data.status === "SUCCESS") {
                    setUserId(response.data.data);
                } else {
                    setError("Could not fetch user ID.");
                }
            } catch (error) {
                console.error("Error fetching user ID:", error);
                setError("Error fetching user ID.");
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchCart = async () => {
            if (userId === null) return;
            try {
                setLoading(true);
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
                setLoading(false);
            }
        };

        fetchCart();
    }, [userId]);

    // Function to update item quantity with loading state
    const updateItemQuantity = async (itemId, newQuantity) => {
        setLoadingItems(prev => ({ ...prev, [itemId]: true })); // Set loading for this item

        try {
            const response = await axiosInstance.post(`/api/cart/update-item`, {
                userId,
                itemId,
                quantity: newQuantity
            });

            if (response.data.status === "SUCCESS") {
                setCart(prevCart => ({
                    ...prevCart,
                    cartItems: prevCart.cartItems.map(item =>
                        item.id === itemId ? { ...item, quantity: newQuantity } : item
                    )
                }));
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error("Error updating item quantity:", err);
            setError("Failed to update item quantity.");
        } finally {
            setLoadingItems(prev => ({ ...prev, [itemId]: false })); // Reset loading for this item
        }
    };

    // Function to remove item from cart
    const removeItem = async (itemId) => {
        setLoadingItems(prev => ({ ...prev, [itemId]: true })); // Set loading for this item

        try {
            const response = await axiosInstance.delete(`/api/cart/remove-item`, {
                data: { userId, itemId }
            });

            if (response.data.status === "SUCCESS") {
                setCart(prevCart => ({
                    ...prevCart,
                    cartItems: prevCart.cartItems.filter(item => item.id !== itemId)
                }));
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error("Error removing item:", err);
            setError("Failed to remove item.");
        } finally {
            setLoadingItems(prev => ({ ...prev, [itemId]: false })); // Reset loading for this item
        }
    };

    // Error state
    if (error) return <div>Error: {error}</div>;

    // Cart is empty
    if (cart && cart.cartItems.length === 0 && !loading) {
        return <div>Your cart is empty.</div>;
    }

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Item Image</th>
                        <th>Price at Time</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                <Loader />
                            </td>
                        </tr>
                    ) : (
                        cart.cartItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <img 
                                        src="https://picsum.photos/id/1/50/50" 
                                        alt={item.name} 
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                    />
                                </td>
                                <td>${item.priceAtTime.toFixed(2)}</td>
                                <td>
                                    {loadingItems[item.id] ? (
                                        <Loader /> // Show loader while updating quantity
                                    ) : (
                                        <>
                                            <button 
                                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            {item.quantity}
                                            <button 
                                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </>
                                    )}
                                </td>
                                <td>${(item.priceAtTime * item.quantity).toFixed(2)}</td>
                                <td>
                                    {loadingItems[item.id] ? (
                                        <Loader /> // Show loader while removing item
                                    ) : (
                                        <button className="remove-button" onClick={() => removeItem(item.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {!loading && cart && (
                <h5>
                    Total Price: $
                    {cart.cartItems.reduce((total, item) => total + (item.priceAtTime * item.quantity), 0).toFixed(2)}
                </h5>
            )}
        </div>
    );
}

export default Cart;
