import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ setPage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        try {
            await login(username, password);
            setPage('home');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md">
                <form onSubmit={handleLogin} className="bg-white shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">Welcome Back</h2>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} className="shadow-sm appearance-none border border-slate-300 rounded-lg w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="username" type="text" placeholder="your_username" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} className="shadow-sm appearance-none border border-slate-300 rounded-lg w-full py-3 px-4 text-slate-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" id="password" type="password" placeholder="******************" />
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300" type="submit">
                        Sign In
                    </button>
                    <p className="text-center text-slate-500 text-sm mt-6">
                        Don't have an account? <a href="#" onClick={() => setPage('signup')} className="font-bold text-blue-600 hover:text-blue-800">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;