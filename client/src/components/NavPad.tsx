import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavPadProps {
  onPress: (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'ENTER') => void;
}

export const NavPad: React.FC<NavPadProps> = ({ onPress }) => {
  const handleClick = (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'ENTER') => {
    onPress(direction);
  };

  const handleKeyDown = (event: React.KeyboardEvent, direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'ENTER') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onPress(direction);
    }
  };

  const buttonVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.1, y: -2 },
    tap: { scale: 0.95, y: 0 }
  };

  const containerVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 }
  };

  const arrowVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2 },
    tap: { scale: 0.9 }
  };

  return (
    <motion.div 
      className="grid grid-cols-3 grid-rows-3 gap-2 w-20 h-20 p-1"
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
    >
      {/* Top arrow - UP */}
      <div className="col-start-2 row-start-1 flex justify-center items-end pb-1">
        <motion.button
          className="w-14 h-9 bg-gradient-to-b from-slate-600 to-slate-700 text-white rounded-t-2xl flex items-center justify-center text-base font-bold hover:from-slate-500 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-slate-500/30 shadow-lg relative overflow-hidden group"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleClick('UP')}
          onKeyDown={(e) => handleKeyDown(e, 'UP')}
          aria-label="Up"
          role="button"
          tabIndex={0}
        >
          {/* Arrow icon */}
          <motion.div
            className="text-xl text-white group-hover:text-blue-200 transition-colors duration-200"
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            ▲
          </motion.div>
          
          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"
          />
        </motion.button>
      </div>

      {/* Left arrow - LEFT */}
      <div className="col-start-1 row-start-2 flex items-center justify-start pr-1">
        <motion.button
          className="w-9 h-14 bg-gradient-to-b from-slate-600 to-slate-700 text-white rounded-l-2xl flex items-center justify-center text-base font-bold hover:from-slate-500 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-slate-500/30 shadow-lg relative overflow-hidden group"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleClick('LEFT')}
          onKeyDown={(e) => handleKeyDown(e, 'LEFT')}
          aria-label="Left"
          role="button"
          tabIndex={0}
        >
          {/* Arrow icon */}
          <motion.div
            className="text-xl text-white group-hover:text-blue-200 transition-colors duration-200"
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            ◀
          </motion.div>
          
          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl"
          />
        </motion.button>
      </div>

      {/* Center Enter button */}
      <div className="col-start-2 row-start-2 flex items-center justify-center">
        <motion.button
          className="w-14 h-14 bg-gradient-to-b from-slate-600 to-slate-700 text-white rounded-2xl flex items-center justify-center text-base font-bold hover:from-slate-500 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-slate-500/30 shadow-lg relative overflow-hidden group"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleClick('ENTER')}
          onKeyDown={(e) => handleKeyDown(e, 'ENTER')}
          aria-label="Enter"
          role="button"
          tabIndex={0}
        >
          {/* Enter icon */}
          <motion.div
            className="text-xl text-green-400 group-hover:text-green-300 transition-colors duration-200 font-bold"
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            ↵
          </motion.div>
          
          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          />
        </motion.button>
      </div>

      {/* Right arrow - RIGHT */}
      <div className="col-start-3 row-start-2 flex items-center justify-end pl-1">
        <motion.button
          className="w-9 h-14 bg-gradient-to-b from-slate-600 to-slate-700 text-white rounded-r-2xl flex items-center justify-center text-base font-bold hover:from-slate-500 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-slate-500/30 shadow-lg relative overflow-hidden group"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleClick('RIGHT')}
          onKeyDown={(e) => handleKeyDown(e, 'RIGHT')}
          aria-label="Right"
          role="button"
          tabIndex={0}
        >
          {/* Arrow icon */}
          <motion.div
            className="text-xl text-white group-hover:text-blue-200 transition-colors duration-200"
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            ▶
          </motion.div>
          
          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-l from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-2xl"
          />
        </motion.button>
      </div>

      {/* Bottom arrow - DOWN */}
      <div className="col-start-2 row-start-3 flex justify-center items-start pt-1">
        <motion.button
          className="w-14 h-9 bg-gradient-to-b from-slate-600 to-slate-700 text-white rounded-b-2xl flex items-center justify-center text-base font-bold hover:from-slate-500 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-slate-500/30 shadow-lg relative overflow-hidden group"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => handleClick('DOWN')}
          onKeyDown={(e) => handleKeyDown(e, 'DOWN')}
          aria-label="Down"
          role="button"
          tabIndex={0}
        >
          {/* Arrow icon */}
          <motion.div
            className="text-xl text-white group-hover:text-blue-200 transition-colors duration-200"
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            ▼
          </motion.div>
          
          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
          />
        </motion.button>
      </div>
    </motion.div>
  );
};
