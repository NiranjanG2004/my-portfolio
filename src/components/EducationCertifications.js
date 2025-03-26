import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import awsLogo from '../assets/aws-logo.png';
import { FaDownload, FaTimes } from 'react-icons/fa';

const EducationCertifications = () => {
  const [selectedCert, setSelectedCert] = useState(null); // For certificate preview modal
  const controls = useAnimation(); // For timeline animation

  const education = [
    {
      degree: 'B.Tech IT',
      institution: 'Kongu Engineering College',
      score: 'CGPA: 7.17',
      year: '2022 - 2026',
      progress: (7.17 / 10) * 100, // Convert CGPA to percentage for progress circle
    },
    {
      degree: 'HSC',
      institution: 'SVN Matric Hr Sec School',
      score: 'Percentage: 66.5%',
      year: '2021 - 2022',
      progress: 66.5, // Percentage for progress circle
    },
    {
      degree: 'SSLC',
      institution: 'SVN Matric Hr Sec School',
      score: 'Percentage: 85.5%',
      year: '2019 - 2020',
      progress: 85.5, // Percentage for progress circle
    },
  ];

  const certifications = [
    {
      name: 'AWS Cloud Practitioner',
      link: '/certificates/aws-cloud-practitioner.pdf',
      logo: awsLogo,
      preview: '/certificates/aws-cloud-practitioner.pdf', // Path to the PDF for preview
    },
  ];

  // Timeline animation variants
  const timelineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { x: (index) => (index % 2 === 0 ? -100 : 100), opacity: 0 },
    visible: (index) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.3,
        ease: 'easeOut',
      },
    }),
  };

  // Trigger animation when section comes into view
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const section = document.getElementById('education-certifications');
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
        controls.start('visible');
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, handleScroll]);

  return (
    <div id="education-certifications" className="py-20 px-4 md:px-20 scroll-mt-20 relative">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 text-center mb-12 mt-15"
      >
        Education & Certifications
      </motion.h1>

      {/* Education Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 mb-8 text-center">
          Education
        </h2>
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            variants={timelineVariants}
            initial="hidden"
            animate={controls}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full hidden md:block"
          />

          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              initial="hidden"
              animate={controls}
              className={`flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col md:flex-row`}
            >
              {/* Education Card with 3D Tilt Effect */}
              <motion.div
                className={`md:w-5/12 p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg relative overflow-hidden ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                } w-full`}
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: index % 2 === 0 ? 5 : -5,
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                }}
                style={{ perspective: 1000 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {/* Glowing Background on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-md"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{edu.degree}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                  <p className="text-gray-500 dark:text-gray-500">{edu.score}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">{edu.year}</p>
                  {/* Progress Circle for CGPA/Percentage */}
                  <div className="mt-4 relative w-16 h-16">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200 dark:text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${edu.progress}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {edu.progress.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Timeline Dot */}
              <motion.div
                variants={dotVariants}
                initial="hidden"
                animate={controls}
                className="w-full md:w-2/12 flex justify-center my-4 md:my-0"
              >
                <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-md z-10" />
              </motion.div>

              <div className="w-full md:w-5/12 hidden md:block"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 mb-8 text-center">
          Certifications
        </h2>
        <div className="grid gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex justify-between items-center p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                {cert.logo && (
                  <motion.img
                    src={cert.logo}
                    alt={`${cert.name} logo`}
                    className="w-12 h-12 object-contain"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{cert.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Earned Certification</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 transition-colors duration-300"
                >
                  Preview
                </motion.button>
                <a
                  href={cert.link}
                  download
                  className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center space-x-2"
                >
                  <FaDownload />
                  <span>Download</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <FaTimes size={24} />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">{selectedCert.name}</h3>
            {/* PDF Preview using iframe */}
            <div className="bg-gray-200 dark:bg-gray-800 h-96 flex items-center justify-center rounded-lg overflow-hidden">
              {selectedCert.preview ? (
                <iframe
                  src={selectedCert.preview}
                  title={selectedCert.name}
                  className="w-full h-full border-none"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<p className="text-gray-500 dark:text-gray-400">Failed to load PDF. Please download the certificate.</p>';
                  }}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No preview available</p>
              )}
            </div>
            <a
              href={selectedCert.link}
              download
              className="mt-4 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 transition-colors duration-300"
            >
              Download Certificate
            </a>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EducationCertifications;