import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Hero = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.2, rotate: 10 },
    tap: { scale: 0.9 },
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    console.log('Gmail button tapped');
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    if (!navigator.clipboard) {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
      return;
    }

    navigator.clipboard
      .writeText('niranjang1614@gmail.com')
      .then(() => {
        setEmailCopied(true);
        setCopyError(false);
        setTimeout(() => setEmailCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy email:', err);
        setCopyError(true);
        setTimeout(() => setCopyError(false), 3000);
      });
  };

  const handleTapWithVibration = (message) => {
    console.log(message);
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20 pt-20">
      {/* Left Section: Text and Social Icons */}
      <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Hello!👋
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6">
          I'm Niranjan G
          <p>I am a web developer passionate about building dynamic and interactive web applications. I focus on creating high-quality solutions that enhance user experience.</p>
        </p>
        <div className="flex justify-center md:justify-start space-x-4 mb-6">
          <motion.a
            href="https://github.com/NiranjanG2004"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Niranjan's GitHub profile"
            className="relative focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full pointer-events-auto"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleTapWithVibration('GitHub button tapped')}
            onTouchStart={() => handleTapWithVibration('GitHub button tapped')}
          >
            <FaGithub className="text-3xl text-gray-600 hover:text-gray-800 active:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:active:text-gray-200 focus:text-gray-800 dark:focus:text-gray-200 transition-colors" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 hover:opacity-100 transition-opacity">
              GitHub
            </span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/niranjangovindhasamy/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Niranjan's LinkedIn profile"
            className="relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full pointer-events-auto"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleTapWithVibration('LinkedIn button tapped')}
            onTouchStart={() => handleTapWithVibration('LinkedIn button tapped')}
          >
            <FaLinkedin className="text-3xl text-blue-600 hover:text-blue-800 active:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 dark:active:text-blue-400 focus:text-blue-800 dark:focus:text-blue-400 transition-colors" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 hover:opacity-100 transition-opacity">
              LinkedIn
            </span>
          </motion.a>

          <motion.button
            onClick={handleEmailClick}
            onTouchStart={handleEmailClick}
            aria-label={emailCopied ? "Email copied to clipboard" : "Copy Niranjan's email address"}
            className="relative focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full pointer-events-auto"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <SiGmail className="text-3xl text-red-600 hover:text-red-800 active:text-red-800 dark:text-red-500 dark:hover:text-red-400 dark:active:text-red-400 focus:text-red-800 dark:focus:text-red-400 transition-colors" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 hover:opacity-100 transition-opacity">
              Email
            </span>
            {emailCopied && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded z-10">
                Copied!
              </span>
            )}
            {copyError && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs py-1 px-2 rounded z-10">
                Failed! Use: niranjang1614@gmail.com
              </span>
            )}
          </motion.button>

         
        </div>
      </div>

      <div className="md:w-1/2 flex justify-center md:justify-end">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="relative"
        >
          <img
            src="/assets/profile-pic.png"
            alt="Niranjan G"
            className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;