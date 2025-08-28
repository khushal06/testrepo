import React from 'react';
import { motion } from 'framer-motion';
import { rows } from '../lib/layout';
import { Key } from './Key';
import { NavPad } from './NavPad';

interface KeypadProps {
  onPress: (id: string) => void;
  secondMode: boolean;
  alphaMode: boolean;
}

export const Keypad: React.FC<KeypadProps> = ({ onPress, secondMode, alphaMode }) => {
  const handleNavPress = (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'ENTER') => {
    switch (direction) {
      case 'UP':
        onPress('NAV_UP');
        break;
      case 'DOWN':
        onPress('NAV_DOWN');
        break;
      case 'LEFT':
        onPress('NAV_LEFT');
        break;
      case 'RIGHT':
        onPress('NAV_RIGHT');
        break;
      case 'ENTER':
        onPress('ENTER');
        break;
    }
  };

  const rowVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const keyVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -20 }
  };

  return (
    <motion.div 
      className="grid gap-3"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ staggerChildren: 0.1 }}
    >
      {rows.map((row, rowIndex) => (
        <motion.div 
          key={rowIndex} 
          className="grid grid-cols-5 gap-3"
          variants={rowVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: rowIndex * 0.1 }}
        >
          {row.map((keyConfig, keyIndex) => {
            if (keyConfig.type === 'nav') {
              return (
                <motion.div 
                  key={keyConfig.id} 
                  className="flex items-center justify-center"
                  variants={keyVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ delay: rowIndex * 0.1 + keyIndex * 0.05 }}
                >
                  <NavPad onPress={handleNavPress} />
                </motion.div>
              );
            }

            return (
              <motion.div
                key={keyConfig.id}
                variants={keyVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: rowIndex * 0.1 + keyIndex * 0.05 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Key
                  {...keyConfig}
                  onPress={onPress}
                  secondMode={secondMode}
                  alphaMode={alphaMode}
                />
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </motion.div>
  );
};
