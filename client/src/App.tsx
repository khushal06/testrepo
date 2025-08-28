import React from 'react';
import { motion } from 'framer-motion';
import { Calculator } from './components/Calculator';

function App() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const headerVariants = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  const calculatorVariants = {
    initial: { opacity: 0, scale: 0.9, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 30 }
  };

  const footerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 relative overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-indigo-200 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Enhanced header */}
        <motion.header 
          className="text-center mb-12"
          variants={headerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1 
            className="text-5xl font-bold text-slate-800 mb-4 bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            TI-84 Plus CE Calculator
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            A faithful recreation with React, TypeScript, and Tailwind CSS
          </motion.p>
          
          {/* Feature badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full text-sm font-medium border border-slate-200/50 shadow-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.header>
        
        {/* Enhanced calculator */}
        <motion.div
          variants={calculatorVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Calculator />
        </motion.div>
        
        {/* Enhanced footer */}
        <motion.footer 
          className="text-center mt-12"
          variants={footerVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-700 mb-3">🎮 How to Use</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div>
                <h4 className="font-medium text-slate-700 mb-2">⌨️ Keyboard Shortcuts</h4>
                <ul className="space-y-1">
                  <li>• <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">0-9</kbd> for digits</li>
                  <li>• <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">+ - * / .</kbd> for operations</li>
                  <li>• <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">Enter</kbd> or <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">=</kbd> to calculate</li>
                  <li>• <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">Backspace</kbd> to delete</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-slate-700 mb-2">🎯 Special Modes</h4>
                <ul className="space-y-1">
                  <li>• <kbd className="px-2 py-1 bg-blue-200 rounded text-xs">Shift</kbd> for 2nd mode</li>
                  <li>• <kbd className="px-2 py-1 bg-green-200 rounded text-xs">CapsLock</kbd> for Alpha mode</li>
                  <li>• <kbd className="px-2 py-1 bg-slate-200 rounded text-xs">Arrow keys</kbd> for navigation</li>
                  <li>• Click any key for visual feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
}

export default App;
