import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyConfig } from '../lib/layout';
import { secondModeLabels, alphaModeLabels } from '../lib/keyHandlers';

interface KeyProps extends KeyConfig {
  onPress: (id: string) => void;
  secondMode: boolean;
  alphaMode: boolean;
}

export const Key: React.FC<KeyProps> = ({
  id,
  label,
  color = 'default',
  wide = false,
  tall = false,
  onPress,
  secondMode,
  alphaMode,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getLabel = () => {
    if (secondMode && secondModeLabels[id]) {
      return secondModeLabels[id];
    }
    if (alphaMode && alphaModeLabels[id]) {
      return alphaModeLabels[id];
    }
    return label;
  };

  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'key-blue';
      case 'green':
        return 'key-green';
      case 'gray':
        return 'key-gray';
      default:
        return 'key-default';
    }
  };

  const handleClick = () => {
    setIsPressed(true);
    onPress(id);
    setTimeout(() => setIsPressed(false), 150);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const keyVariants = {
    initial: { 
      scale: 1, 
      y: 0,
      rotateX: 0,
      filter: 'brightness(1)'
    },
    hover: { 
      scale: 1.05, 
      y: -2,
      rotateX: 5,
      filter: 'brightness(1.1)',
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.95, 
      y: 0,
      rotateX: 0,
      filter: 'brightness(0.9)',
      transition: { duration: 0.1, ease: "easeIn" }
    }
  };

  const labelVariants = {
    initial: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, opacity: 1 },
    tap: { scale: 0.9, opacity: 0.8 }
  };

  const isSecondModeActive = secondMode && secondModeLabels[id];
  const isAlphaModeActive = alphaMode && alphaModeLabels[id];

  return (
    <motion.button
      className={`${getColorClass()} rounded-2xl font-mono text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
        wide ? 'col-span-2' : ''
      } ${tall ? 'row-span-2' : ''} w-14 h-14 flex items-center justify-center relative overflow-hidden ${
        isPressed ? 'key-active' : ''
      }`}
      variants={keyVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={getLabel()}
      role="button"
      tabIndex={0}
      layout
    >
      {/* Key surface highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl pointer-events-none" />
      
      {/* 2nd mode indicator glow */}
      {isSecondModeActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Alpha mode indicator glow */}
      {isAlphaModeActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Key label with animation */}
      <motion.div
        className={`relative z-10 font-bold tracking-wide ${
          isSecondModeActive 
            ? 'text-blue-100 drop-shadow-lg' 
            : isAlphaModeActive 
            ? 'text-green-100 drop-shadow-lg'
            : 'text-white'
        }`}
        variants={labelVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        {getLabel()}
      </motion.div>

      {/* Ripple effect on press */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-2xl"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Subtle glow effect for special keys */}
      {color === 'blue' && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
          }}
        />
      )}

      {color === 'green' && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: '0 0 20px rgba(5, 150, 105, 0.4)',
          }}
        />
      )}

      {/* 2nd mode active indicator */}
      {isSecondModeActive && (
        <motion.div
          className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full opacity-80"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Alpha mode active indicator */}
      {isAlphaModeActive && (
        <motion.div
          className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full opacity-80"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};
