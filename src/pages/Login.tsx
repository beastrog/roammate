import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User as UserIcon, Sun, Moon } from 'lucide-react';
import { useTheme, useCurrentTheme } from '../contexts/ThemeContext';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const currentTheme = useCurrentTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/');
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
      {!isLogin && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className={`h-5 w-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Full name"
            required={!isLogin}
          />
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Mail className={`h-5 w-5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`block w-full pl-10 pr-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder="Email address"
          required
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className={`h-5 w-5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`block w-full pl-10 pr-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          placeholder="Password"
          required
        />
      </div>

      {!isLogin && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className={`h-5 w-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            placeholder="Confirm password"
            required={!isLogin}
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 hover:shadow-lg"
      >
        {isLogin ? 'Sign in' : 'Create account'}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${
            theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
          }`}></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className={`px-2 ${
            theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'
          }`}>Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {['Google', 'Facebook', 'Apple'].map((provider) => (
          <motion.button
            key={provider}
            type="button"
            className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {provider}
          </motion.button>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className={`text-sm font-medium focus:outline-none transition-colors ${
            theme === 'dark' 
              ? 'text-orange-400 hover:text-orange-300' 
              : 'text-orange-600 hover:text-orange-700'
          }`}
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
    </form>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      currentTheme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50'
    }`}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          currentTheme === 'dark' 
            ? 'bg-gray-800/95 backdrop-blur-sm border border-gray-700/50' 
            : 'bg-white/95 backdrop-blur-sm border border-orange-100'
        }`}
      >
        <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-center">
          <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors duration-200"
            aria-label={`Switch to ${
              theme === 'system' ? 'system' : currentTheme === 'dark' ? 'light' : 'dark'
            } mode`}
            title={`Current: ${
              theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'
            }`}
          >
            {theme === 'system' ? (
              <div className="relative w-5 h-5">
                <Sun className="absolute inset-0 w-4 h-4 text-amber-200 transition-all duration-300" />
                <Moon className="absolute inset-0 w-4 h-4 text-blue-200 transition-all duration-300" />
              </div>
            ) : currentTheme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-white/90 mt-1">
            {isLogin ? 'Sign in to continue' : 'Join us to start your journey'}
          </p>
        </div>
        {renderForm()}
      </motion.div>
    </div>
  );
};

export default Login;
