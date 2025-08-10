import React, { useState, useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import api from '../services/api';
import { useCart } from '../context/CartContext';


const HomePage = ({ setPage }) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setFeaturedProducts(response.data.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-slate-50">
            <header className="relative bg-slate-800 text-white text-center py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-700/40 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">Tech Elevated. Life Simplified.</h1>
                    <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Explore our curated selection of premium electronics designed to blend performance and style.</p>
                    <button onClick={() => setPage('shop')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                        Explore Collection
                    </button>
                </div>
            </header>
            <main className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default HomePage;