import React from 'react';

const Footer = () => (
    <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-4 col-span-2 md:col-span-1">
                    <h3 className="text-2xl font-bold text-white">MyShop</h3>
                    <p>The best place to find your next favorite piece of tech.</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold text-white">Shop</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">All Products</a></li>
                        <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-white">Deals</a></li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold text-white">Company</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold text-white">Legal</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-slate-800 pt-8 text-center">
                <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;