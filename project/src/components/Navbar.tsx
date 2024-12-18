import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Team', path: '/team' },
  { name: 'Contact', path: '/contact' }
];

export function Navbar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isAuthPage = ['/signin', '/signup', '/forgot-password'].includes(location.pathname);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav border-b"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <Logo />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {!isAuthPage && (
              user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}