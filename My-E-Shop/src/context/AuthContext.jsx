import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    // This function is now wrapped in a try...catch block to handle errors gracefully.
    const login = async (username, password) => {
        try {
            const userData = await authService.login(username, password);
            setUser(userData);
            return userData;
        } catch (error) {
            // If login fails, we log the error and re-throw it so the
            // LoginPage component can display an error message to the user.
            console.error("Login failed in AuthContext:", error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = { user, isAuthenticated: !!user, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
