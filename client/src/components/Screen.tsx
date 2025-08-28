import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ScreenProps {
  input: string;
  history: string[];
  cursorPosition: number;
}

// Mock data for the graph (quadratic function y = x² - 2x - 3)
const generateGraphData = () => {
  const data = [];
  for (let x = -3; x <= 5; x += 0.5) {
    data.push({
      x: x,
      y: x * x - 2 * x - 3,
    });
  }
  return data;
};

export const Screen: React.FC<ScreenProps> = ({ input, history, cursorPosition }) => {
  const graphData = generateGraphData();

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const inputVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const historyVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  const graphVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <motion.div 
      className="screen-bezel mb-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="screen-display p-6 min-h-[240px] relative overflow-hidden">
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
        </div>

        {/* Input line with enhanced cursor */}
        <motion.div 
          className="mb-6"
          variants={inputVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
        >
          <div className="text-xl font-mono bg-transparent border-none outline-none w-full relative">
            <AnimatePresence mode="wait">
              {input.slice(0, cursorPosition)}
              <motion.span
                key={cursorPosition}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-1 rounded animate-pulse"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {input[cursorPosition] || ' '}
              </motion.span>
              {input.slice(cursorPosition + 1)}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Enhanced history area */}
        <motion.div 
          className="mb-6"
          variants={historyVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          <div className="text-sm text-slate-600 mb-3 font-semibold flex items-center">
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full mr-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            History
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {history.map((entry, index) => (
                <motion.div
                  key={`${entry}-${index}`}
                  className="text-sm font-mono text-slate-700 bg-gradient-to-r from-slate-200 to-blue-100 px-3 py-2 rounded-lg border border-slate-300/50 shadow-sm"
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  {entry}
                </motion.div>
              ))}
              {history.length === 0 && (
                <motion.div 
                  className="text-sm text-slate-400 italic bg-slate-100 px-3 py-2 rounded-lg border border-dashed border-slate-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  No calculations yet
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Enhanced graph area */}
        <motion.div 
          className="h-28"
          variants={graphVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.6 }}
        >
          <div className="text-sm text-slate-600 mb-2 font-semibold flex items-center">
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full mr-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            y = x² - 2x - 3
          </div>
          <div className="relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e2e8f0" 
                  strokeOpacity={0.6}
                />
                <XAxis 
                  dataKey="x" 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="url(#gradient)"
                  strokeWidth={3}
                  dot={false}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Enhanced glare overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-xl" />
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl" />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
