import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiInfo, FiX, FiAward } from 'react-icons/fi';
import ParticleBackground from './ParticleBackground';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setShowScrollTop] = useState(false);
  const modalRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with payment processing, user authentication, and admin dashboard.',
      longDescription: 'This e-commerce platform is a full-stack application built with React, Node.js, and MongoDB. It includes user authentication with JWT, a product catalog with search and filter capabilities, a shopping cart, and payment integration using Stripe. The admin dashboard allows for product management, order tracking, and user management, with a responsive design for both desktop and mobile users.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'node', 'mongodb'],
      github: 'https://github.com/NiranjanG2004/render_user_page',
      featured: true,
      category: 'web'
    },
    {
      id: 2,
      title: 'Social Media Sentiment Analysis Dashboard',
      description: 'A dashboard for analyzing sentiment in social media data using machine learning and data visualization.',
      longDescription: 'This project leverages Python and machine learning libraries like NLTK and Scikit-learn to perform sentiment analysis on social media data. The frontend is built with React, and the backend uses Flask to serve the API. The dashboard provides real-time analytics, data visualization with Chart.js, and an interactive interface for users to explore sentiment trends across platforms like Twitter.',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'flask', 'python', 'nlp'],
      github: 'https://github.com/NiranjanG2004/Social-media-dashboard_fullstack',
      featured: false,
      category: 'data'
    },
    {
      id: 3,
      title: 'Interactive Quiz App',
      description: 'A quiz application with real-time multiplayer features, adaptive learning, and analytics.',
      longDescription: 'This interactive quiz app is built with React and MongoDB, featuring real-time multiplayer functionality using Socket.io. It includes adaptive learning algorithms to adjust question difficulty based on user performance, leaderboards, achievement badges, and detailed analytics to track learning progress. The app is fully responsive and optimized for both desktop and mobile devices.',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'mongodb', 'analytics'],
      github: 'https://github.com/NiranjanG2004/interactive-quiz-app',
      featured: false,
      category: 'web'
    },
    
  ];

  const allItems = [...projects];

  const filteredItems = filter === 'all'
    ? allItems
    : filter === 'featured'
      ? allItems.filter(item => item.featured)
      : filter === 'certification'
        ? allItems.filter(item => item.category === 'certification')
        : ['web', 'data'].includes(filter)
          ? allItems.filter(item => item.category === filter)
          : allItems.filter(item => item.tags?.includes(filter));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.5
      }
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleItemDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) return;

      const rect = projectsSection.getBoundingClientRect();
      setShowScrollTop(rect.top < -300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleModalKeyDown = useCallback((e) => {
    if (!showModal) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Tab') {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }, [showModal, closeModal]);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const firstFocusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (firstFocusable) firstFocusable.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleModalKeyDown);
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleModalKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleModalKeyDown);
    };
  }, [showModal, handleModalKeyDown]);

  return (
    <>
      <ParticleBackground />
      <section id="projects" className="py-20 px-4 md:px-20 scroll-mt-20 relative">
        <div className="container mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              My Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
              Explore my portfolio of projects showcasing my skills in web development, data science, and cloud architecture.
            </p>
          </motion.div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!loading && (
              <>
                {filteredItems.length > 0 ? (
                  <motion.div
                    key={filter}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {filteredItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        layoutId={`item-card-${item.id}`}
                        className="group"
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg h-full flex flex-col border border-gray-700/50 dark:border-gray-600/50 relative">
                          <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800/50 to-transparent z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                            <motion.img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              loading="lazy"
                            />

                            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                              {item.category !== 'certification' ? (
                                <>
                                  <motion.a
                                    href={item.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-blue-600 transition-all"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={`View ${item.title} source code on GitHub`}
                                  >
                                    <FiGithub className="text-xl" />
                                  </motion.a>
                                  <motion.button
                                    onClick={() => handleItemDetails(item)}
                                    className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-blue-600 transition-all"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={`View ${item.title} details`}
                                  >
                                    <FiInfo className="text-xl" />
                                  </motion.button>
                                </>
                              ) : null}
                            </div>
                          </div>

                          <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                            <p className="text-gray-300 dark:text-gray-400 mb-4 flex-grow text-sm leading-relaxed">
                              {item.longDescription?.substring(0, 120) || item.description}
                              {item.longDescription?.length > 120 && '...'}
                            </p>

                            {item.tags && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {item.tags.map((tag, index) => (
                                  <motion.span
                                    key={index}
                                    className={`px-3 py-1 text-xs rounded-full transition-all cursor-pointer ${
                                      filter === tag
                                        ? 'bg-blue-600/50 text-white'
                                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 dark:bg-gray-600/50 dark:text-gray-200 dark:hover:bg-gray-500/50'
                                    }`}
                                    onClick={() => setFilter(tag)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    {tag}
                                  </motion.span>
                                ))}
                              </div>
                            )}

                            <button
                              onClick={() => handleItemDetails(item)}
                              className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all"
                            >
                              <FiInfo /> View Details
                            </button>
                          </div>

                          {item.featured && (
                            <motion.div
                              className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-bold py-1 px-2 rounded text-white shadow-lg"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.2, type: "spring" }}
                            >
                              Featured
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className="col-span-full text-center py-12"
                    variants={itemVariants}
                  >
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No items found matching the selected filter.</p>
                    <button
                      onClick={() => setFilter('all')}
                      className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Show all items
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="https://github.com/NiranjanG2004"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-2 mx-auto"
            >
              <FiGithub /> View All Projects on GitHub
            </a>
          </motion.div>
        </div>

        <AnimatePresence>
          {showModal && selectedItem && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                ref={modalRef}
                className="bg-gray-800/90 backdrop-blur-md rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700/50 dark:border-gray-600/50"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-labelledby="modal-title"
                aria-modal="true"
                tabIndex="-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 id="modal-title" className="text-2xl font-bold text-white">
                      {selectedItem.title}
                    </h3>
                    <motion.button
                      onClick={closeModal}
                      className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 dark:hover:bg-gray-600/50 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Close modal"
                    >
                      <FiX className="text-xl" />
                    </motion.button>
                  </div>

                  <motion.div
                    className="aspect-video rounded-lg overflow-hidden mb-6 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>

                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">
                      {selectedItem.category === 'certification' ? 'Certification Overview' : 'Project Overview'}
                    </h4>
                    <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
                      {selectedItem.longDescription || selectedItem.description}
                    </p>
                  </motion.div>

                  {selectedItem.category === 'certification' ? (
                    <>
                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">Details</h4>
                        <p className="text-gray-300 dark:text-gray-400">
                          <strong>Issue Date:</strong> {selectedItem.issueDate}
                        </p>
                        <p className="text-gray-300 dark:text-gray-400">
                          <strong>Validation Number:</strong> {selectedItem.validationNumber}
                        </p>
                      </motion.div>

                      <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.a
                          href={selectedItem.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FiAward /> View Certificate PDF
                        </motion.a>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.tags.map((tag, index) => (
                            <motion.span
                              key={index}
                              className="px-3 py-1 bg-gray-700 text-sm text-gray-300 dark:bg-gray-600 dark:text-gray-200 rounded-full border border-gray-600 dark:border-gray-500"
                              whileHover={{ scale: 1.05 }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                transition: { delay: 0.4 + (index * 0.05) }
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.a
                          href={selectedItem.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FiGithub /> View Source Code
                        </motion.a>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Projects;