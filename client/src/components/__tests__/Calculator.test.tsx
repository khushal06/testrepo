import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Calculator } from '../Calculator';

describe('Calculator', () => {
  it('renders calculator components', () => {
    render(<Calculator />);
    
    // Check if keypad keys are rendered
    expect(screen.getByText('2nd')).toBeInTheDocument();
    expect(screen.getByText('alpha')).toBeInTheDocument();
    expect(screen.getByText('enter')).toBeInTheDocument();
    
    // Check if screen elements are rendered
    expect(screen.getByText('History:')).toBeInTheDocument();
    expect(screen.getByText('y = x² - 2x - 3')).toBeInTheDocument();
  });

  it('renders all key rows', () => {
    render(<Calculator />);
    
    // Check utility row
    expect(screen.getByText('y=')).toBeInTheDocument();
    expect(screen.getByText('window')).toBeInTheDocument();
    expect(screen.getByText('zoom')).toBeInTheDocument();
    expect(screen.getByText('trace')).toBeInTheDocument();
    expect(screen.getByText('graph')).toBeInTheDocument();
    
    // Check mode row
    expect(screen.getByText('mode')).toBeInTheDocument();
    expect(screen.getByText('del')).toBeInTheDocument();
    expect(screen.getByText('math')).toBeInTheDocument();
    
    // Check digits
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
  });
});
