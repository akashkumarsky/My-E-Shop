import React from 'react';
import { ShoppingCartIcon } from './Icons';

const ProductCard = ({ product, onAddToCart }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out group border border-slate-200">
        <div className="relative">
            <img src={product.imageUrl || `https://placehold.co/600x400/1e293b/ffffff?text=${product.name.replace(' ', '+')}`} alt={product.name} className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 right-0 p-4 transform translate-x-16 group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
                <button onClick={onAddToCart} className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                    <ShoppingCartIcon />
                </button>
            </div>
        </div>
        <div className="p-5">
            <p className="text-sm font-semibold text-blue-600">{product.category?.name || 'Category'}</p>
            <h3 className="text-lg font-bold text-slate-800 mt-1">{product.name}</h3>
            <p className="text-slate-500 mt-2 text-sm h-10">{product.description}</p>
            <div className="mt-4">
                <span className="text-2xl font-bold text-slate-900">${product.price}</span>
            </div>
        </div>
    </div>
);

export default ProductCard;