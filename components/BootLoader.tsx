import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  "INITIALIZING SYSTEM CORE...",
  "LOADING KERNEL MODULES...",
  "MOUNTING FILE SYSTEMS...",
  "CHECKING MEMORY INTEGRITY... OK",
  "ESTABLISHING NETWORK CONNECTION...",
  "LOADING USER INTERFACE...",
  "SYSTEM READY."
];

export const BootLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < bootSequence.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, bootSequence[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, Math.random() * 200 + 50); // Random delay between 50ms and 250ms

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[100] flex flex-col justify-end p-8 font-mono text-sm md:text-base overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl w-full mx-auto mb-12">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="text-green-500 mb-1"
          >
            <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
            {line}
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-3 h-5 bg-green-500 mt-2"
        />
      </div>
      
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
    </motion.div>
  );
};
