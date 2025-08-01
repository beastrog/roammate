import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Destinations', href: '/discover' },
        { name: 'Guides', href: '/guides' },
        { name: 'Experiences', href: '/experiences' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Safety', href: '/safety' },
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#' },
    { icon: <Twitter size={20} />, href: '#' },
    { icon: <Facebook size={20} />, href: '#' },
  ];

  return (
    <footer className={`mt-16 border-t transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700' 
        : 'bg-gradient-to-b from-white to-orange-50 border-orange-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Logo className="text-2xl" />
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Experience the real India with Roammate - Your gateway to authentic cultural experiences, local guides, and unforgettable journeys.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`transition-colors text-sm ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:text-orange-400' 
                      : 'text-gray-600 hover:text-orange-500'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className={`font-semibold uppercase text-sm tracking-wider mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      className={`transition-colors text-sm ${
                        theme === 'dark' 
                          ? 'text-gray-300 hover:text-orange-400' 
                          : 'text-gray-600 hover:text-orange-500'
                      }`}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <span className="w-1 h-1 mr-2 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className={`font-semibold uppercase text-sm tracking-wider mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  123 Travel Street, Wanderlust City
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <a href="mailto:hello@roammate.com" className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'
                } transition-colors`}>
                  hello@roammate.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <a href="tel:+1234567890" className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'
                } transition-colors`}>
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Mon-Fri: 9:00 - 18:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-8 mt-12 flex flex-col md:flex-row justify-between items-center ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Roammate. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className={`text-sm ${
              theme === 'dark' ? 'text-gray-300 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'
            } transition-colors`}>
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-orange-600 transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-sm text-gray-500 hover:text-orange-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
