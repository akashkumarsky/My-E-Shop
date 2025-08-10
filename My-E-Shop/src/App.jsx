import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
// Import Style

// Import Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Import Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';

// A simple placeholder for pages that are not fully built yet
const PlaceholderPage = ({ title }) => (
  <div className="bg-slate-50 flex items-center justify-center py-20 min-h-[calc(100vh-10rem)]">
    <div className="text-center bg-white p-12 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
      <p className="text-slate-600 mt-4">This page is under construction.</p>
    </div>
  </div>
);

function App() {
  // This state manages which page is currently visible to the user.
  const [page, setPage] = useState('home');

  // The useAuth hook provides the current user's state and the logout function.
  const { user, logout } = useAuth();

  // This function determines which page component to render based on the 'page' state.
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} />;
      case 'shop':
        return <ShopPage />;
      case 'login':
        return <LoginPage setPage={setPage} />;
      case 'signup':
        return <SignupPage setPage={setPage} />;
      case 'cart':
        return <CartPage />;
      case 'profile':
        // This is a protected route, only shown if a user is logged in.
        return user ? <PlaceholderPage title={`Welcome, ${user.username}`} /> : <LoginPage setPage={setPage} />;
      case 'categories':
        return <PlaceholderPage title="Categories" />;
      case 'about':
        return <PlaceholderPage title="About Us" />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* The 'user' and 'logout' props are now correctly passed to the Navbar */}
      <Navbar setPage={setPage} user={user} logout={logout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
