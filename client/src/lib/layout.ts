export interface KeyConfig {
  id: string;
  label: string;
  altLabel?: string;
  color?: 'default' | 'blue' | 'green' | 'gray';
  wide?: boolean;
  tall?: boolean;
  type?: 'nav';
}

export const rows: KeyConfig[][] = [
  // Utility row
  [
    { id: 'Y=', label: 'y=', color: 'gray' },
    { id: 'WINDOW', label: 'window', color: 'gray' },
    { id: 'ZOOM', label: 'zoom', color: 'gray' },
    { id: 'TRACE', label: 'trace', color: 'gray' },
    { id: 'GRAPH', label: 'graph', color: 'gray' },
  ],
  // Mode row
  [
    { id: '2ND', label: '2nd', color: 'blue' },
    { id: 'MODE', label: 'mode', color: 'gray' },
    { id: 'DEL', label: 'del', color: 'gray' },
    { id: 'MATH', label: 'math', color: 'gray' },
    { id: 'ALPHA', label: 'alpha', color: 'green' },
  ],
  // Powers row
  [
    { id: 'INV', label: 'x⁻¹', color: 'gray' },
    { id: 'SQR', label: 'x²', color: 'gray' },
    { id: 'POW', label: '^', color: 'gray' },
    { id: 'DIV', label: '÷', color: 'gray' },
    { id: 'MULT', label: '×', color: 'gray' },
  ],
  // Digits & ops row 1
  [
    { id: '7', label: '7' },
    { id: '8', label: '8' },
    { id: '9', label: '9' },
    { id: 'SUB', label: '−' },
    { id: 'NAV', label: '', type: 'nav' },
  ],
  // Digits & ops row 2
  [
    { id: '4', label: '4' },
    { id: '5', label: '5' },
    { id: '6', label: '6' },
    { id: 'ADD', label: '+' },
    { id: 'ENTER', label: 'enter', tall: true },
  ],
  // Digits & ops row 3
  [
    { id: '1', label: '1' },
    { id: '2', label: '2' },
    { id: '3', label: '3' },
    { id: 'DEC', label: '.' },
    { id: '0', label: '0', wide: true },
  ],
];

// Keyboard mapping for shortcuts
export const keyboardMap: Record<string, string> = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '+': 'ADD',
  '-': 'SUB',
  '*': 'MULT',
  '/': 'DIV',
  '.': 'DEC',
  'Enter': 'ENTER',
  '=': 'ENTER',
  'Backspace': 'DEL',
  'Delete': 'DEL',
  'ArrowUp': 'NAV_UP',
  'ArrowDown': 'NAV_DOWN',
  'ArrowLeft': 'NAV_LEFT',
  'ArrowRight': 'NAV_RIGHT',
  'Shift': '2ND',
  'CapsLock': 'ALPHA',
};
