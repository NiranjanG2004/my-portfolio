import React from 'react';
import { motion } from 'framer-motion';

// Icons
import { DiReact, DiNodejsSmall, DiMongodb, DiJavascript1, DiCss3, DiHtml5, DiJava, DiPython, DiGit, DiLinux, DiCode } from 'react-icons/di';
import { SiTypescript, SiTailwindcss, SiRedux, SiFigma, SiAdobephotoshop, SiCanva } from "react-icons/si";

const skillCategories = [
  {
    name: "Programming Languages",
    skills: [
      { name: 'JavaScript', icon: <DiJavascript1 className="text-2xl" />, color: '#F7DF1E' },
      { name: 'Java', icon: <DiJava className="text-2xl" />, color: '#007396' },
      { name: 'C', icon: <DiCode className="text-2xl" />, color: '#A8B9CC' },
      //
    ]
  },
  {
    name: "Frontend Development",
    skills: [
      { name: 'React', icon: <DiReact className="text-2xl" />, color: '#61DAFB' },
      { name: 'HTML5', icon: <DiHtml5 className="text-2xl" />, color: '#E34F26' },
      { name: 'CSS3', icon: <DiCss3 className="text-2xl" />, color: '#1572B6' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-2xl" />, color: '#38B2AC' },
//    
]
  },
  {
    name: "Backend Development",
    skills: [
      { name: 'Node.js', icon: <DiNodejsSmall className="text-2xl" />, color: '#539E43' },
      { name: 'MongoDB', icon: <DiMongodb className="text-2xl" />, color: '#47A248' },
    ]
  },
  
  {
    name: "Design Tools",
    skills: [
      { name: 'Figma', icon: <SiFigma className="text-2xl" />, color: '#F24E1E' },
      { name: 'Photoshop', icon: <SiAdobephotoshop className="text-2xl" />, color: '#31A8FF' },
      { name: 'Canva', icon: <SiCanva className="text-2xl" />, color: '#20C4CB' },
    ]
  }
];

const SkillsNew = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="skills" className="py-20 px-4 md:px-20 relative ">
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
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full max-w-5xl flex flex-wrap gap-8 justify-center mt-8"
        >
          {skillCategories.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="w-full max-w-md bg-gray-800/50 dark:bg-gray-700/50 backdrop-blur-sm border border-[#854CE6] shadow-lg rounded-2xl p-6 md:p-9"
            >
              <h2 className="text-2xl font-semibold text-gray-300 dark:text-gray-400 mb-5 text-center">
                {skill.name}
              </h2>
              <div className="flex flex-wrap justify-center gap-3 mb-5">
                {skill.skills.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-gray-100 dark:text-gray-200 border border-gray-100/80 dark:border-gray-200/80 rounded-xl px-4 py-2 text-base font-normal"
                  >
                    <span style={{ color: item.color }}>{item.icon}</span>
                    {item.name}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsNew;
