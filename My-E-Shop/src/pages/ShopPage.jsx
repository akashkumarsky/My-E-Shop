import React, { useState, useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import api from '../services/api';
import { useCart } from '../context/CartContext';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResponse = await api.get('/products');
                const categoryResponse = await api.get('/categories');
                setProducts(productResponse.data);
                setFilteredProducts(productResponse.data);
                setCategories(['All', ...categoryResponse.data.map(c => c.name)]);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);

    const handleFilter = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category.name === category));
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Our Collection</h1>
            <p className="text-slate-600 mb-10">Find the perfect tech to fit your lifestyle.</p>
            <div className="flex flex-col md:flex-row gap-10">
                <aside className="w-full md:w-1/4">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Categories</h2>
                    <ul className="space-y-2">
                        {categories.map(cat => (
                            <li key={cat}>
                                <button onClick={() => handleFilter(cat)} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-100 text-slate-600'}`}>
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className="w-full md:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ShopPage;