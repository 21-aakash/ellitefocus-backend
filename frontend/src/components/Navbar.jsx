import React, { useState } from 'react';
import { useAuth } from './context/AuthContext'; // Update the path as needed
import logo from '../assets/target (2).png';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2 ml-20">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-8 inline-block mr-2" 
          />
         <a href="/" className="text-2xl font-bold">
  EliteFocus™
</a>

        </div>
        
        {/* Hamburger Menu */}
        <button 
          className="lg:hidden flex items-center px-3 py-2 border border-white rounded text-white hover:text-yellow-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        
        {/* Navigation Links */}
        <div className={`lg:flex lg:space-x-8 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col font-medium  mr-20 gap-5 lg:flex-row lg:space-x-8">
            <a href="/features" className="hover:text-yellow-300 py-2 lg:py-0">Features</a>
            <a href="/teams" className="hover:text-yellow-300 py-2 lg:py-0">For Teams</a>
            <a href="/resources" className="hover:text-yellow-300 py-2 lg:py-0">Resources</a>
            <a href="/pricing" className="hover:text-yellow-300 py-2 lg:py-0">Pricing</a>
            {isAuthenticated ? (
              <button onClick={logout} className="inline-block px-2 py-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-md transition-all">
                Logout
              </button>
               
            ) : (
              <>
               <a href="/login" className="inline-block px-2 py-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-md transition-all">
  Login
</a>
<a href="/register" className="inline-block px-2 py-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-md transition-all">
  Register
</a>

              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
