import React from 'react';
import { motion, Variants } from 'motion/react';
import { Card } from '@/components/ui/card';

const PanelReveal = () => {
  return (
    // Wrapper div that acts as the hover trigger area
    <motion.div
      className="relative w-full max-w-md mx-auto h-48 cursor-pointer"
      whileHover="open"
      initial="closed"
    >
      {/* Content underneath */}
      <Card className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500">
          <div className="p-4 text-white">
            <p className="text-lg font-bold mb-2">Hidden Content</p>
            <p>Hover anywhere to reveal this message!</p>
          </div>
        </div>
      </Card>

      {/* Cover panel */}
      <motion.div
        className="absolute inset-0"
        variants={{
          open: {
            rotateZ: 20,
            y: -100,
            x: 100,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 30
            }
          },
          closed: {
            rotateZ: 0,
            y: 0,
            x: 0,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 30
            }
          }
        } as Variants}
        style={{
          transformOrigin: "top",
          transformStyle: "preserve-3d"
        }}
      >
        <Card className="w-full h-full bg-white shadow-lg">
          <div className="p-4 font-medium text-center">
            Hover to Reveal Content
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PanelReveal;