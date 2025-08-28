import { useState, useCallback, useEffect } from 'react';
import { CalculatorAction } from '../lib/keyHandlers';

export interface CalculatorState {
  input: string;
  history: string[];
  secondMode: boolean;
  alphaMode: boolean;
  cursorPosition: number;
}

export const useCalculatorState = () => {
  const [state, setState] = useState<CalculatorState>({
    input: '',
    history: [],
    secondMode: false,
    alphaMode: false,
    cursorPosition: 0,
  });

  const handleKeyPress = useCallback((keyId: string) => {
    setState(prevState => {
      let newState = { ...prevState };

      switch (keyId) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          newState.input += keyId;
          newState.cursorPosition = newState.input.length;
          break;

        case 'ADD':
          newState.input += '+';
          newState.cursorPosition = newState.input.length;
          break;

        case 'SUB':
          newState.input += '-';
          newState.cursorPosition = newState.input.length;
          break;

        case 'MULT':
          newState.input += '*';
          newState.cursorPosition = newState.input.length;
          break;

        case 'DIV':
          newState.input += '/';
          newState.cursorPosition = newState.input.length;
          break;

        case 'DEC':
          newState.input += '.';
          newState.cursorPosition = newState.input.length;
          break;

        case 'POW':
          newState.input += '^';
          newState.cursorPosition = newState.input.length;
          break;

        case 'ENTER':
          if (newState.input.trim()) {
            newState.history = [newState.input, ...newState.history.slice(0, 2)];
            newState.input = '';
            newState.cursorPosition = 0;
          }
          break;

        case 'DEL':
          if (newState.input.length > 0) {
            newState.input = newState.input.slice(0, -1);
            newState.cursorPosition = Math.max(0, newState.cursorPosition - 1);
          }
          break;

        case '2ND':
          newState.secondMode = !newState.secondMode;
          // Reset after one use
          if (newState.secondMode) {
            setTimeout(() => {
              setState(prev => ({ ...prev, secondMode: false }));
            }, 100);
          }
          break;

        case 'ALPHA':
          newState.alphaMode = !newState.alphaMode;
          // Reset after one use
          if (newState.alphaMode) {
            setTimeout(() => {
              setState(prev => ({ ...prev, alphaMode: false }));
            }, 100);
          }
          break;

        case 'NAV_UP':
          newState.cursorPosition = Math.max(0, newState.cursorPosition - 1);
          break;

        case 'NAV_DOWN':
          newState.cursorPosition = Math.min(newState.input.length, newState.cursorPosition + 1);
          break;

        case 'NAV_LEFT':
          newState.cursorPosition = Math.max(0, newState.cursorPosition - 1);
          break;

        case 'NAV_RIGHT':
          newState.cursorPosition = Math.min(newState.input.length, newState.cursorPosition + 1);
          break;

        default:
          break;
      }

      return newState;
    });
  }, []);

  const handleKeyboard = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    const keyId = key === 'Enter' ? 'ENTER' : key === 'Backspace' ? 'DEL' : key;
    
    if (keyId in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '^', 'ENTER', 'DEL']) {
      event.preventDefault();
      handleKeyPress(keyId);
    } else if (key.startsWith('Arrow')) {
      event.preventDefault();
      const direction = key.replace('Arrow', '').toUpperCase();
      handleKeyPress(`NAV_${direction}`);
    } else if (key === 'Shift') {
      event.preventDefault();
      handleKeyPress('2ND');
    } else if (key === 'CapsLock') {
      event.preventDefault();
      handleKeyPress('ALPHA');
    }
  }, [handleKeyPress]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  return {
    ...state,
    handleKeyPress,
  };
};
