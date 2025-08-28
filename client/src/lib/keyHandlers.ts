export interface CalculatorAction {
  type: 'input' | 'function' | 'clear' | 'delete' | 'enter' | 'mode';
  value?: string;
  mode?: '2nd' | 'alpha';
}

export const keyHandlers: Record<string, (input: string) => CalculatorAction> = {
  // Digits
  '0': () => ({ type: 'input', value: '0' }),
  '1': () => ({ type: 'input', value: '1' }),
  '2': () => ({ type: 'input', value: '2' }),
  '3': () => ({ type: 'input', value: '3' }),
  '4': () => ({ type: 'input', value: '4' }),
  '5': () => ({ type: 'input', value: '5' }),
  '6': () => ({ type: 'input', value: '6' }),
  '7': () => ({ type: 'input', value: '7' }),
  '8': () => ({ type: 'input', value: '8' }),
  '9': () => ({ type: 'input', value: '9' }),
  
  // Operations
  'ADD': () => ({ type: 'input', value: '+' }),
  'SUB': () => ({ type: 'input', value: '-' }),
  'MULT': () => ({ type: 'input', value: '*' }),
  'DIV': () => ({ type: 'input', value: '/' }),
  'DEC': () => ({ type: 'input', value: '.' }),
  'POW': () => ({ type: 'input', value: '^' }),
  
  // Functions
  'SQR': () => ({ type: 'function', value: 'sqr' }),
  'INV': () => ({ type: 'function', value: 'inv' }),
  'MATH': () => ({ type: 'function', value: 'math' }),
  
  // Control
  'ENTER': () => ({ type: 'enter' }),
  'DEL': () => ({ type: 'delete' }),
  'CLEAR': () => ({ type: 'clear' }),
  
  // Mode toggles
  '2ND': () => ({ type: 'mode', mode: '2nd' }),
  'ALPHA': () => ({ type: 'mode', mode: 'alpha' }),
  
  // Utility keys (no action for now)
  'Y=': () => ({ type: 'function', value: 'y=' }),
  'WINDOW': () => ({ type: 'function', value: 'window' }),
  'ZOOM': () => ({ type: 'function', value: 'zoom' }),
  'TRACE': () => ({ type: 'function', value: 'trace' }),
  'GRAPH': () => ({ type: 'function', value: 'graph' }),
  'MODE': () => ({ type: 'function', value: 'mode' }),
};

// 2nd mode alternate labels - Comprehensive TI-84 functions
export const secondModeLabels: Record<string, string> = {
  // Utility row
  'Y=': 'STAT',
  'WINDOW': 'TBLSET',
  'ZOOM': 'FORMAT',
  'TRACE': 'CALC',
  'GRAPH': 'TABLE',
  
  // Mode row
  'MODE': 'QUIT',
  'MATH': 'TEST',
  'ALPHA': 'LOCK',
  
  // Powers row - Trigonometric functions
  'INV': 'SIN',
  'SQR': 'COS',
  'POW': 'TAN',
  'DIV': 'LN',
  'MULT': 'LOG',
  
  // Operations - Storage functions
  'ADD': 'STO',
  'SUB': 'RCL',
  'DEC': 'ANS',
  
  // Digits - Additional functions
  '0': 'θ',
  '1': 'L1',
  '2': 'L2',
  '3': 'L3',
  '4': 'L4',
  '5': 'L5',
  '6': 'L6',
  '7': 'L7',
  '8': 'L8',
  '9': 'L9',
};

// Alpha mode alternate labels
export const alphaModeLabels: Record<string, string> = {
  // Utility row
  'Y=': 'A',
  'WINDOW': 'B',
  'ZOOM': 'C',
  'TRACE': 'D',
  'GRAPH': 'E',
  
  // Mode row
  'MODE': 'F',
  'MATH': 'G',
  'ALPHA': 'H',
  
  // Powers row
  'INV': 'I',
  'SQR': 'J',
  'POW': 'K',
  'DIV': 'L',
  'MULT': 'M',
  
  // Operations
  'ADD': 'N',
  'SUB': 'O',
  'DEC': 'P',
  
  // Digits
  '0': 'Q',
  '1': 'R',
  '2': 'S',
  '3': 'T',
  '4': 'U',
  '5': 'V',
  '6': 'W',
  '7': 'X',
  '8': 'Y',
  '9': 'Z',
};
