import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education-certifications', 'skills', 'experience', 'projects', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);

      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'education-certifications', label: 'Education & Certifications' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact & Resume' },
  ];

  return (
    <nav className="sticky top-0 z-30">
      {/* Scroll Progress Bar */}
      <div className="w-full h-1 bg-gray-200/50 dark:bg-gray-700/50 fixed top-0 left-0 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-300 to-pink-400"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        />
      </div>

      {/* Main Navbar */}
      <div
        className={`flex justify-between items-center p-6 backdrop-blur-md bg-white/20 dark:bg-gray-900/20 text-gray-800 dark:text-gray-100 shadow-lg transition-shadow duration-300 border-b border-gray-200/20 dark:border-gray-700/20 ${
          window.scrollY > 0 ? 'shadow-xl' : 'shadow-lg'
        }`}
      >
        {/* Logo with Glow Effect */}
        <motion.div
          className="text-3xl font-extrabold tracking-tight relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-pink-600 dark:from-yellow-300 dark:to-pink-400 relative z-10">
            Niranjan G
          </span>
          <motion.div
            className="absolute inset-0 blur-md bg-gradient-to-r from-yellow-600/30 to-pink-600/30 dark:from-yellow-300/30 dark:to-pink-400/30 rounded-full"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu" className="text-2xl text-gray-800 dark:text-gray-100">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className="relative group cursor-pointer transition-all duration-300 ease-in-out"
            >
              <a
                href={`#${link.id}`}
                className={`transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-yellow-600 dark:text-yellow-300'
                    : 'text-gray-800 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-300'
                }`}
              >
                {link.label}
              </a>
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-600 to-pink-600 dark:from-yellow-300 dark:to-pink-400 transition-all duration-300 ease-in-out ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </li>
          ))}
        </ul>

        {/* Theme Toggle with Tooltip */}
        <div className="relative group">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <FaMoon className="text-xl text-yellow-600 dark:text-yellow-300" />
            ) : (
              <FaSun className="text-xl text-yellow-600 dark:text-yellow-300" />
            )}
          </button>
          <div className="absolute top-12 right-0 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden backdrop-blur-md bg-white/20 dark:bg-gray-900/20 text-gray-800 dark:text-gray-100 p-6 space-y-4 ${
          isOpen ? 'block' : 'hidden'
        }`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`block text-lg font-medium transition-colors duration-300 ${
              activeSection === link.id
                ? 'text-yellow-600 dark:text-yellow-300'
                : 'text-gray-800 dark:text-gray-100 hover:text-yellow-600 dark:hover:text-yellow-300'
            }`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </motion.div>
    </nav>
  );
};

export default Navbar;