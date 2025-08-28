import React from 'react';
import { motion } from 'framer-motion';
import { Screen } from './Screen';
import { Keypad } from './Keypad';
import { useCalculatorState } from '../hooks/useCalculatorState';

export const Calculator: React.FC = () => {
  const { input, history, secondMode, alphaMode, cursorPosition, handleKeyPress } = useCalculatorState();

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8, rotateY: -15 },
    animate: { opacity: 1, scale: 1, rotateY: 0 },
    exit: { opacity: 0, scale: 0.8, rotateY: 15 }
  };

  const modeIndicatorVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 }
  };

  return (
    <motion.div 
      className="calculator-chassis max-w-lg mx-auto relative"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Mode indicators */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {secondMode && (
          <motion.div
            className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg"
            variants={modeIndicatorVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            2ND
          </motion.div>
        )}
        {alphaMode && (
          <motion.div
            className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg"
            variants={modeIndicatorVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            ALPHA
          </motion.div>
        )}
      </div>

      {/* Calculator content */}
      <div className="relative z-10">
        <Screen 
          input={input}
          history={history}
          cursorPosition={cursorPosition}
        />
        <Keypad 
          onPress={handleKeyPress}
          secondMode={secondMode}
          alphaMode={alphaMode}
        />
      </div>

      {/* Enhanced shadow and glow effects */}
      <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-[2.5rem]" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-[2.5rem]" />
      </div>
    </motion.div>
  );
};
