import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, MapPin, Heart, Bell, Search, ChevronDown, LogOut, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClickAway } from 'react-use';
import { useTheme, useCurrentTheme } from '../../contexts/ThemeContext';
import Logo from '../ui/Logo';

// Mock data for notifications and likes
const notifications = [
  { id: 1, text: 'New message from Sarah', time: '2m ago', read: false, type: 'message' },
  { id: 2, text: 'Your trip to Goa is confirmed', time: '1h ago', read: true, type: 'booking' },
  { id: 3, text: 'New travel buddy request', time: '3h ago', read: false, type: 'request' },
];

const likedItems = [
  { id: 1, title: 'Kerala Backwaters Tour', location: 'Alappuzha, Kerala', price: '₹2,499' },
  { id: 2, title: 'Himalayan Trek', location: 'Manali, Himachal', price: '₹3,999' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { theme: currentTheme, setTheme, toggleTheme } = useTheme();
  const resolvedTheme = useCurrentTheme();
  
  // Refs for click away handling
  const notificationsRef = useRef(null);
  const likesRef = useRef(null);
  const userMenuRef = useRef(null);
  
  // Handle clicks outside of popups
  useClickAway(notificationsRef, () => setShowNotifications(false));
  useClickAway(likesRef, () => setShowLikes(false));
  useClickAway(userMenuRef, () => setShowUserMenu(false));

  const navItems = [
    { path: '/', label: 'Home', icon: MapPin },
    { path: '/discover', label: 'Discover', icon: MapPin },
    { path: '/guides', label: 'Guides', icon: User },
    { path: '/trips', label: 'My Trips', icon: MapPin }
  ];
  
  // Toggle authentication state and redirect
  const handleAuthToggle = () => {
    const newAuthState = !isLoggedIn;
    setIsLoggedIn(newAuthState);
    setShowUserMenu(false);
    
    if (newAuthState) {
      navigate('/login');
    } else {
      navigate('/');
    }
  };
  
  // Close all dropdowns when route changes
  useEffect(() => {
    setShowNotifications(false);
    setShowLikes(false);
    setShowUserMenu(false);
  }, [location]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-orange-600 mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Logo className="text-2xl" />
              </motion.div>
            </Link>
            
            {/* Search Bar - Desktop */}
            <div className="hidden md:block ml-8 relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Search destinations, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label={`Switch to ${
                currentTheme === 'system'
                  ? 'system'
                  : resolvedTheme === 'dark'
                  ? 'light'
                  : 'dark'
              } mode`}
              title={`Current: ${
                currentTheme === 'system'
                  ? 'System'
                  : currentTheme === 'dark'
                  ? 'Dark'
                  : 'Light'
              }`}
            >
              {currentTheme === 'system' ? (
                <div className="relative w-5 h-5">
                  <Sun className="absolute inset-0 w-4 h-4 text-amber-500 dark:text-amber-400 transition-all duration-300" />
                  <Moon className="absolute inset-0 w-4 h-4 text-gray-400 dark:text-blue-400 transition-all duration-300" />
                </div>
              ) : resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`relative px-4 py-2.5 rounded-lg transition-all flex items-center space-x-2 ${
                      isActive 
                        ? 'text-orange-600 bg-orange-50 font-medium' 
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/50'
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-6 h-0.5 bg-orange-500 rounded-full -translate-x-1/2"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button - Mobile */}
            <button className="md:hidden p-2 text-gray-600 hover:text-orange-600">
              <Search size={20} />
            </button>
            
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <motion.button
                className={`p-2 rounded-full relative ${showNotifications ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowLikes(false);
                  setShowUserMenu(false);
                }}
              >
                <Bell size={20} />
                <motion.div
                  className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"
                  animate={{ 
                    scale: notifications.some(n => !n.read) ? [1, 1.2, 1] : 1,
                    opacity: notifications.some(n => !n.read) ? 1 : 0
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.button>
              
              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        <button className="text-xs text-orange-600 hover:text-orange-700">
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                              !notification.read ? 'bg-orange-50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`h-2 w-2 mt-1.5 rounded-full ${
                                !notification.read ? 'bg-orange-500' : 'bg-transparent'
                              }`} />
                              <div className="flex-1">
                                <p className="text-sm text-gray-800">{notification.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center">
                          <Bell className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                          <p className="text-sm text-gray-500">No new notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-gray-50 text-center">
                      <Link to="/notifications" className="text-sm font-medium text-orange-600 hover:text-orange-700">
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Likes */}
            <div className="relative" ref={likesRef}>
              <motion.button
                className={`p-2 rounded-full relative ${showLikes ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowLikes(!showLikes);
                  setShowNotifications(false);
                  setShowUserMenu(false);
                }}
              >
                <Heart size={20} />
                {likedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {likedItems.length}
                  </span>
                )}
              </motion.button>
              
              {/* Likes Dropdown */}
              <AnimatePresence>
                {showLikes && (
                  <motion.div
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  >
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">Saved Items</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {likedItems.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                          {likedItems.map((item) => (
                            <Link
                              key={item.id}
                              to={`/trip/${item.id}`}
                              className="block p-4 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden">
                                  <div className="h-full w-full bg-gradient-to-br from-orange-100 to-amber-100" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                  <p className="text-xs text-gray-500">{item.location}</p>
                                  <p className="text-sm font-medium text-orange-600 mt-1">{item.price}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="p-6 text-center">
                          <Heart className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                          <p className="text-sm text-gray-500">No saved items yet</p>
                          <button className="mt-2 text-sm font-medium text-orange-600 hover:text-orange-700">
                            Explore trips
                          </button>
                        </div>
                      )}
                    </div>
                    {likedItems.length > 0 && (
                      <div className="p-3 bg-gray-50 text-center">
                        <Link to="/saved" className="text-sm font-medium text-orange-600 hover:text-orange-700">
                          View all saved items
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* User Authentication */}
            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  className="flex items-center space-x-1 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                    setShowLikes(false);
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-medium">
                    U
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                      <div className="p-4 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/trips"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                        >
                          My Trips
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                        >
                          Settings
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleAuthToggle}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Log in
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg hover:shadow-md transition-all"
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-orange-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'text-orange-600 bg-orange-50' 
                          : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;