import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useCalculatorState } from '../useCalculatorState';

describe('useCalculatorState', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useCalculatorState());

    expect(result.current.input).toBe('');
    expect(result.current.history).toEqual([]);
    expect(result.current.secondMode).toBe(false);
    expect(result.current.alphaMode).toBe(false);
    expect(result.current.cursorPosition).toBe(0);
  });

  it('adds digits to input', () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.handleKeyPress('1');
    });

    expect(result.current.input).toBe('1');
    expect(result.current.cursorPosition).toBe(1);

    act(() => {
      result.current.handleKeyPress('2');
    });

    expect(result.current.input).toBe('12');
    expect(result.current.cursorPosition).toBe(2);
  });

  it('adds operators to input', () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.handleKeyPress('1');
      result.current.handleKeyPress('ADD');
      result.current.handleKeyPress('2');
    });

    expect(result.current.input).toBe('1+2');
  });

  it('handles delete key', () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.handleKeyPress('1');
      result.current.handleKeyPress('2');
      result.current.handleKeyPress('3');
    });

    expect(result.current.input).toBe('123');

    act(() => {
      result.current.handleKeyPress('DEL');
    });

    expect(result.current.input).toBe('12');
    expect(result.current.cursorPosition).toBe(2);
  });

  it('handles enter key and adds to history', () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.handleKeyPress('1');
      result.current.handleKeyPress('ADD');
      result.current.handleKeyPress('2');
      result.current.handleKeyPress('ENTER');
    });

    expect(result.current.input).toBe('');
    expect(result.current.history).toEqual(['1+2']);
    expect(result.current.cursorPosition).toBe(0);
  });

  it('toggles second mode', () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.handleKeyPress('2ND');
    });

    expect(result.current.secondMode).toBe(true);

    // Should auto-reset after a short delay
    setTimeout(() => {
      expect(result.current.secondMode).toBe(false);
    }, 150);
  });

  it('toggles alpha mode', () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.handleKeyPress('ALPHA');
    });

    expect(result.current.alphaMode).toBe(true);

    // Should auto-reset after a short delay
    setTimeout(() => {
      expect(result.current.alphaMode).toBe(false);
    }, 150);
  });

  it('handles navigation keys', () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.handleKeyPress('1');
      result.current.handleKeyPress('2');
      result.current.handleKeyPress('3');
    });

    expect(result.current.cursorPosition).toBe(3);

    act(() => {
      result.current.handleKeyPress('NAV_LEFT');
    });

    expect(result.current.cursorPosition).toBe(2);

    act(() => {
      result.current.handleKeyPress('NAV_RIGHT');
    });

    expect(result.current.cursorPosition).toBe(3);
  });

  it('limits history to 3 entries', () => {
    const { result } = renderHook(() => useCalculatorState());

    act(() => {
      result.current.handleKeyPress('1');
      result.current.handleKeyPress('ENTER');
      result.current.handleKeyPress('2');
      result.current.handleKeyPress('ENTER');
      result.current.handleKeyPress('3');
      result.current.handleKeyPress('ENTER');
      result.current.handleKeyPress('4');
      result.current.handleKeyPress('ENTER');
    });

    expect(result.current.history).toEqual(['4', '3', '2']);
    expect(result.current.history).toHaveLength(3);
  });
});
