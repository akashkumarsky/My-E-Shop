import React, { useState } from 'react';
import authService from '../services/authService';

const SignupPage = ({ setPage }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await authService.signup(username, email, password);
            setSuccess('Registration successful! Please log in.');
            setTimeout(() => setPage('login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md">
                <form onSubmit={handleSignup} className="bg-white shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">Create an Account</h2>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
                    {success && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">{success}</p>}
                    <div className="mb-4">
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="username-signup">Username</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4" id="username-signup" type="text" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="email-signup">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4" id="email-signup" type="email" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password-signup">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4" id="password-signup" type="password" required />
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg" type="submit">
                        Sign Up
                    </button>
                    <p className="text-center text-slate-500 text-sm mt-6">
                        Already have an account? <a href="#" onClick={() => setPage('login')} className="font-bold text-blue-600 hover:text-blue-800">Log In</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;