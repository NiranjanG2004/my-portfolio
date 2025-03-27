import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DiReact, DiNodejsSmall, DiMongodb, DiJavascript1, DiCss3, DiHtml5,
  DiJava, DiPython, DiGit, DiLinux
} from 'react-icons/di';
import {
  SiTypescript, SiTailwindcss, SiGraphql, SiDocker,
  SiAmazonwebservices, SiC, SiRedux, SiFlutter,
  SiKubernetes, SiTensorflow, SiApple
} from 'react-icons/si';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        { name: 'JavaScript', icon: <DiJavascript1 className="text-4xl" />, color: '#F7DF1E', proficiency: 90, frequency: 'Daily' },
        { name: 'Java', icon: <DiJava className="text-4xl" />, color: '#007396', proficiency: 80, frequency: 'Weekly' },
        { name: 'C', icon: <SiC className="text-4xl" />, color: '#A8B9CC', proficiency: 70, frequency: 'Occasional' },
        { name: 'Python', icon: <DiPython className="text-4xl" />, color: '#3776AB', proficiency: 85, frequency: 'Weekly' },
      ]
    },
    {
      name: "Frontend Development",
      skills: [
        { name: 'React', icon: <DiReact className="text-4xl" />, color: '#61DAFB', proficiency: 95, frequency: 'Daily' },
        { name: 'HTML5', icon: <DiHtml5 className="text-4xl" />, color: '#E34F26', proficiency: 90, frequency: 'Daily' },
        { name: 'CSS3', icon: <DiCss3 className="text-4xl" />, color: '#1572B6', proficiency: 90, frequency: 'Daily' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-4xl" />, color: '#38B2AC', proficiency: 80, frequency: 'Weekly' },
      ]
    },
    {
      name: "Backend Development",
      skills: [
        { name: 'Node.js', icon: <DiNodejsSmall className="text-4xl" />, color: '#539E43', proficiency: 85, frequency: 'Weekly' },
        { name: 'MongoDB', icon: <DiMongodb className="text-4xl" />, color: '#47A248', proficiency: 80, frequency: 'Weekly' },
      ]
    },
    {
      name: "DevOps & Tools",
      skills: [
        { name: 'Git', icon: <DiGit className="text-4xl" />, color: '#F05032', proficiency: 90, frequency: 'Daily' },
        { name: 'Docker', icon: <SiDocker className="text-4xl" />, color: '#2496ED', proficiency: 70, frequency: 'Occasional' },
        { name: 'Kubernetes', icon: <SiKubernetes className="text-4xl" />, color: '#326CE5', proficiency: 65, frequency: 'Occasional' },
        { name: 'AWS', icon: <SiAmazonwebservices className="text-4xl" />, color: '#FF9900', proficiency: 75, frequency: 'Weekly' },
        { name: 'Linux', icon: <DiLinux className="text-4xl" />, color: '#FCC624', proficiency: 80, frequency: 'Weekly' },
      ]
    },
  ];

  const allCategories = ['All', ...skillCategories.map(category => category.name)];

  const getFilteredSkills = () => {
    if (selectedCategory === 'All' && !searchQuery) {
      return skillCategories;
    }

    if (selectedCategory === 'All') {
      return skillCategories.map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.skills.length > 0);
    }

    const filteredCategory = skillCategories.find(
      category => category.name === selectedCategory
    );

    if (!filteredCategory) return [];

    if (!searchQuery) {
      return [filteredCategory];
    }

    return [{
      ...filteredCategory,
      skills: filteredCategory.skills.filter(skill =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }].filter(category => category.skills.length > 0);
  };

  const filteredSkills = getFilteredSkills();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8
      }
    }
  };

  const SkillIcon = ({ skill }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <motion.div
        className="relative perspective-1000"
        onHoverStart={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
        whileTap={{ scale: 0.95 }}
        aria-label={skill.name}
        tabIndex={0}
      >
        {/* 3D Flip Card */}
        <motion.div
          className="w-24 h-32 relative"
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Front Side */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-gray-800/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-700 dark:border-gray-600 shadow-xl cursor-pointer"
            animate={{
              boxShadow: isHovered
                ? `0 0 25px ${skill.color}60, 0 0 80px ${skill.color}30`
                : "0 0 0 transparent",
              scale: isHovered ? 1.05 : 1
            }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex items-center justify-center flex-col">
              <div className="mb-1" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <p className="text-xs font-medium opacity-80 text-gray-100 dark:text-gray-200">{skill.name}</p>
            </div>
            {/* Particle Effect on Hover */}
            {isHovered && (
              <motion.div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{ backgroundColor: skill.color }}
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
            )}
          </motion.div>

          {/* Back Side */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-gray-800/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center border border-gray-700 dark:border-gray-600 shadow-xl cursor-pointer"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-xs font-medium text-gray-100 dark:text-gray-200 mb-2">Proficiency</p>
            {/* Proficiency Circle */}
            <div className="relative w-12 h-12">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-600 dark:text-gray-500"
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
                  stroke={skill.color}
                  strokeWidth="3"
                  strokeDasharray={`${skill.proficiency}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-100 dark:text-gray-200">
                {skill.proficiency}%
              </div>
            </div>
            {/* Frequency Tag */}
            <span
              className={`mt-2 text-xs px-2 py-1 rounded-full text-white ${
                skill.frequency === 'Daily'
                  ? 'bg-green-500'
                  : skill.frequency === 'Weekly'
                  ? 'bg-blue-500'
                  : 'bg-gray-500'
              }`}
            >
              {skill.frequency}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 px-4 md:px-20 scroll-mt-7 relative">
      <div className="container mx-auto relative z-20 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 text-center mb-12">
            Skills
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
            Over the past 2 years, I have been honing my skills in various domains, gaining hands-on experience and practical knowledge. Below are the areas I excel in and continue to grow my expertise.
          </p>
        </motion.div>

        {/* Category Filter with Animation */}
        <motion.div
          className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full max-w-xs">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-lg bg-gray-800/80 dark:bg-gray-700/80 text-gray-100 dark:text-gray-200 border border-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              aria-label="Filter skills by category"
            >
              {allCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-800/80 dark:bg-gray-700/80 text-gray-100 dark:text-gray-200 border border-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search skills"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-100 dark:hover:text-gray-200"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Tabs with Animation */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {allCategories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="space-y-20 w-full max-w-5xl">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((category, catIndex) => (
              category.skills.length > 0 && (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <motion.h3
                    className="text-2xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 text-center"
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1
                    }}
                    initial={{
                      opacity: 0,
                      y: 20,
                      scale: 0.95
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                  >
                    {category.name}
                  </motion.h3>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-16 justify-center"
                  >
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex flex-col items-center"
                      >
                        <SkillIcon skill={skill} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <h3 className="text-xl text-gray-400 dark:text-gray-500">No skills found matching your criteria</h3>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-24 text-center px-4 py-8 bg-gray-800/40 dark:bg-gray-900/40 backdrop-blur-md rounded-xl border border-gray-700 dark:border-gray-600 w-full max-w-5xl"
        >
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">My Learning Journey</h3>
          <p className="text-gray-300 dark:text-gray-400 max-w-3xl mx-auto">
            I'm passionate about continuous growth and staying at the forefront of technology trends.
            Currently exploring advanced AI integration, serverless architectures, and Web3 development.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="btn-primary relative overflow-hidden group"
            >
              <span className="relative z-10">View My Projects</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </a>

            <a
              href="#contact"
              className="btn-secondary relative overflow-hidden group"
            >
              <span className="relative z-10">Get In Touch</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;