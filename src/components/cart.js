// src/components/Cart.js
import React from 'react';
import { useCart } from '../context/cartContext';

function Cart() {
  const { state, dispatch } = useCart();

  const handleRemoveItem = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
  };

  const handleUpdateQuantity = (item, quantity) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id: item.id, quantity } });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {state.items.map(item => (
            <li key={item.id}>
              <span>{item.name} - ${item.price} x {item.quantity}</span>
              <button onClick={() => handleRemoveItem(item)}>Remove</button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item, e.target.value)}
                min="1"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
