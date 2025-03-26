import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiArrowUp, FiUsers } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();
  // eslint-disable-next-line no-empty-pattern
  const [] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);
  const [showGlow, setShowGlow] = useState(false);
  const controls = useAnimation();

  const socialLinks = [
    {
      icon: <FiLinkedin />,
      url: 'https://www.linkedin.com/in/niranjangovindhasamy/',
      label: 'LinkedIn',
      color: 'hover:bg-blue-600',
    },
    {
      icon: <FiGithub />,
      url: 'https://github.com/NiranjanG2004',
      label: 'GitHub',
      color: 'hover:bg-gray-600',
    },
    {
      icon: <FiInstagram />,
      url: 'https://instagram.com/niranjan_govindhasamy',
      label: 'Instagram',
      color: 'hover:bg-pink-600',
    },
  ];

  // Simulated visitor counter (in a real app, this would come from an API)
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Glow effect animation on scroll into view
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setShowGlow(true);
          controls.start({ opacity: 1, scale: 1 });
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  return (
    <footer className="pt-20 pb-10 relative">
      {/* Top Wave Shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none h-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-10 w-full"
          fill="#ffffff"
          fillOpacity="0.9"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="dark:fill-gray-900"
          />
        </svg>
      </div>

      {/* Decorative Elements with Glow Effect */}
      <motion.div
        className="absolute top-1/2 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
        animate={showGlow ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
        animate={showGlow ? { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div className="container mx-auto px-4 relative z-20">
        {/* Scroll to Top Button with Particle Effect */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            y: -5,
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
            transition: { duration: 0.3 },
          }}
          className="bg-blue-600 dark:bg-blue-500 text-white p-3 rounded-full absolute right-10 top-0 transform -translate-y-1/2 shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden"
          aria-label="Scroll to top"
        >
          <FiArrowUp />
          {/* Particle effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                initial={{ x: '50%', y: '50%' }}
                animate={{
                  x: `${Math.random() * 100 - 50}%`,
                  y: `${Math.random() * 100 - 50}%`,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </motion.button>

        {/* Footer Content */}
        <div className="flex flex-col items-center">
          {/* Name and Title with Glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 relative"
          >
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 relative z-10">
              Niranjan
            </h2>
            <motion.div
              className="absolute inset-0 blur-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
              animate={showGlow ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Full Stack Developer
            </p>
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 w-full max-w-md"
          >
            
              
        
          </motion.div>

          {/* Social Links with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-5 mb-10"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`p-3 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:text-white ${link.color} transition-all duration-300 shadow-md`}
                whileHover={{
                  scale: 1.2,
                  rotateX: 10,
                  rotateY: 10,
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                style={{ perspective: 1000 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Visitor Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
          >
            <FiUsers />
            <span>Visitors: {visitorCount.toLocaleString()}</span>
          </motion.div>

          {/* Copyright and Credits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <div className="mb-4 w-20 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400">
              © {year} Niranjan. All Rights Reserved.
            </p>
          </motion.div>

          {/* Privacy and Terms Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 p-3 bg-gray-200/30 dark:bg-gray-800/30 rounded-lg text-xs text-gray-500 dark:text-gray-400"
          >
            <a
              href="#privacy"
              className="hover:text-blue-500 dark:hover:text-blue-400 mr-4 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;