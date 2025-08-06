'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-teal-600 text-white p-2 rounded-lg">
            <i className="fas fa-home text-xl"></i>
          </div>
          <Link href="/" className="text-2xl font-bold text-teal-700">
            PropertyListing
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="font-medium hover:text-teal-600 transition">Home</Link>
          <Link href="/listings" className="font-medium hover:text-teal-600 transition">Buy</Link>
          <Link href="/listings?type=rent" className="font-medium hover:text-teal-600 transition">Rent</Link>
          <Link href="/listings?type=commercial" className="font-medium hover:text-teal-600 transition">Commercial</Link>
          <Link href="/agents" className="font-medium hover:text-teal-600 transition">Agents</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden md:block text-gray-600 hover:text-teal-600 transition">
                <i className="fas fa-user-circle text-xl"></i>
              </Link>
              <button onClick={handleLogout} className="hidden md:block text-gray-600 hover:text-teal-600 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block text-gray-600 hover:text-teal-600 transition">
                <i className="fas fa-user-circle text-xl"></i>
              </Link>
              <Link href="/create-listing">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition flex items-center">
                  <i className="fas fa-plus mr-2"></i> List Property
                </button>
              </Link>
            </>
          )}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            <Link href="/" className="font-medium hover:text-teal-600 transition">Home</Link>
            <Link href="/listings" className="font-medium hover:text-teal-600 transition">Buy</Link>
            <Link href="/listings?type=rent" className="font-medium hover:text-teal-600 transition">Rent</Link>
            <Link href="/listings?type=commercial" className="font-medium hover:text-teal-600 transition">Commercial</Link>
            <Link href="/agents" className="font-medium hover:text-teal-600 transition">Agents</Link>
            {user ? (
              <>
                <Link href="/dashboard" className="font-medium hover:text-teal-600 transition">Dashboard</Link>
                <button onClick={handleLogout} className="font-medium hover:text-teal-600 transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="font-medium hover:text-teal-600 transition">Login</Link>
                <Link href="/register" className="font-medium hover:text-teal-600 transition">Register</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}