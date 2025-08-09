import React, { useState } from 'react';
// Correctly import icons from the dedicated Icons.jsx file
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from './Icons';
import { useCart } from '../../context/CartContext'; // Import useCart to get the cart count

const Navbar = ({ setPage, user, logout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartCount } = useCart(); // Get the real cart count from context

    return (
        <nav className="bg-white/80 backdrop-blur-lg text-slate-900 shadow-sm sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <a href="#" onClick={() => setPage('home')} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">MyShop</a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
                        {['Home', 'Shop', 'Categories', 'About'].map(item => (
                            <a key={item} href="#" onClick={() => setPage(item.toLowerCase())} className="hover:text-blue-600 transition-colors">{item}</a>
                        ))}
                    </div>

                    {/* Desktop Icons & Auth */}
                    <div className="hidden md:flex items-center space-x-5">
                        <button onClick={() => setPage('cart')} className="relative text-slate-500 hover:text-blue-600 transition-colors">
                            <ShoppingCartIcon />
                            {/* Display the real cart count */}
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
                            )}
                        </button>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <button onClick={() => setPage('profile')} className="flex items-center space-x-2">
                                    <UserIcon />
                                    <span className="font-medium">{user.username}</span>
                                </button>
                                <button onClick={logout} className="text-sm font-medium text-slate-500 hover:text-blue-600">Logout</button>
                            </div>
                        ) : (
                            <button onClick={() => setPage('login')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-blue-600">
                            {isMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 absolute top-20 left-0 w-full bg-white shadow-lg">
                    {['Home', 'Shop', 'Categories', 'About'].map(item => (
                        <a key={item} href="#" onClick={() => { setPage(item.toLowerCase()); setIsMenuOpen(false); }} className="block hover:bg-slate-100 rounded-md px-3 py-2 font-medium">{item}</a>
                    ))}
                    <div className="border-t border-slate-200 pt-4 mt-2">
                        {user ? (
                            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2 px-4 rounded-lg">
                                Logout
                            </button>
                        ) : (
                            <button onClick={() => { setPage('login'); setIsMenuOpen(false); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;