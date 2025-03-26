import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  const [activeAnimation, setActiveAnimation] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Keep the animation active for the entire page
      setActiveAnimation(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Gradient Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-20 z-0"
        animate={{
          background: activeAnimation
            ? [
                "radial-gradient(circle at 10% 10%, #4F46E5 0%, transparent 50%)",
                "radial-gradient(circle at 90% 20%, #8B5CF6 0%, transparent 50%)",
                "radial-gradient(circle at 10% 90%, #10B981 0%, transparent 50%)",
                "radial-gradient(circle at 90% 80%, #3B82F6 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, #F59E0B 0%, transparent 50%)",
              ]
            : "radial-gradient(circle at 50% 50%, #4F46E5 0%, transparent 50%)",
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />

      {/* Floating Particles */}
      {activeAnimation && (
        <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-300 dark:bg-blue-600"
              initial={{
                opacity: Math.random() * 0.5 + 0.1,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
              }}
              transition={{
                duration: 20 + Math.random() * 30,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                width: `${Math.random() * 10 + 3}px`,
                height: `${Math.random() * 10 + 3}px`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Background;