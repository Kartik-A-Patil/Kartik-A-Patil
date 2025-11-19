import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface PixelRevealProps {
  children: React.ReactNode;
  pixelSize?: number;
  delay?: number;
  className?: string;
}

export const PixelReveal = ({ 
  children, 
  pixelSize = 40, 
  delay = 0,
  className = "" 
}: PixelRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [pixels, setPixels] = useState<{ id: number; x: number; y: number }[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
        
        const cols = Math.ceil(offsetWidth / pixelSize);
        const rows = Math.ceil(offsetHeight / pixelSize);
        const newPixels = [];
        
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            newPixels.push({
              id: i * cols + j,
              x: j * pixelSize,
              y: i * pixelSize
            });
          }
        }
        // Shuffle pixels for random reveal effect
        setPixels(newPixels.sort(() => Math.random() - 0.5));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, [pixelSize]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div className={`${isInView ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        {children}
      </div>
      
      {/* Pixel Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {pixels.map((pixel) => (
          <motion.div
            key={pixel.id}
            initial={{ opacity: 1 }}
            animate={isInView ? { opacity: 0 } : { opacity: 1 }}
            transition={{ 
              duration: 0.4, 
              delay: delay + Math.random() * 0.5,
              ease: "easeOut" 
            }}
            style={{
              position: 'absolute',
              left: pixel.x,
              top: pixel.y,
              width: pixelSize,
              height: pixelSize,
              backgroundColor: '#000', // Match background color
            }}
          />
        ))}
      </div>
    </div>
  );
};
