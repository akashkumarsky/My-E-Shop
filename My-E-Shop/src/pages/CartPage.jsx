import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-slate-800">Your Cart is Empty</h2>
                <p className="text-slate-600 mt-4">Looks like you haven't added anything to your cart yet.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Your Shopping Cart</h1>
            <div className="bg-white shadow-xl rounded-lg">
                <ul className="divide-y divide-slate-200">
                    {cartItems.map(item => (
                        <li key={item.id} className="flex items-center p-6 space-x-6">
                            <img src={item.imageUrl || `https://placehold.co/100x100/334155/ffffff?text=${item.name.charAt(0)}`} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                                <p className="text-slate-500">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <input 
                                    type="number" 
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    className="w-16 text-center border rounded-md py-1"
                                    min="1"
                                />
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-semibold">Remove</button>
                            </div>
                            <p className="font-bold text-lg w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
                <div className="p-6 border-t border-slate-200 flex justify-end items-center">
                    <div className="text-right">
                        <p className="text-xl font-bold text-slate-900">Total: ${cartTotal.toFixed(2)}</p>
                        <p className="text-sm text-slate-500">Shipping & taxes calculated at checkout.</p>
                    </div>
                    <button className="ml-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;