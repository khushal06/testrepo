import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Key } from '../Key';

describe('Key', () => {
  const mockOnPress = vi.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders with default styling', () => {
    render(
      <Key
        id="test"
        label="Test"
        onPress={mockOnPress}
        secondMode={false}
        alphaMode={false}
      />
    );

    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('key-default');
  });

  it('renders with blue color', () => {
    render(
      <Key
        id="test"
        label="Test"
        color="blue"
        onPress={mockOnPress}
        secondMode={false}
        alphaMode={false}
      />
    );

    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toHaveClass('key-blue');
  });

  it('renders with green color', () => {
    render(
      <Key
        id="test"
        label="Test"
        color="green"
        onPress={mockOnPress}
        secondMode={false}
        alphaMode={false}
      />
    );

    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toHaveClass('key-green');
  });

  it('calls onPress when clicked', () => {
    render(
      <Key
        id="test"
        label="Test"
        onPress={mockOnPress}
        secondMode={false}
        alphaMode={false}
      />
    );

    const button = screen.getByRole('button', { name: 'Test' });
    fireEvent.click(button);
    
    expect(mockOnPress).toHaveBeenCalledWith('test');
  });

  it('calls onPress when Enter is pressed', () => {
    render(
      <Key
        id="test"
        label="Test"
        onPress={mockOnPress}
        secondMode={false}
        alphaMode={false}
      />
    );

    const button = screen.getByRole('button', { name: 'Test' });
    fireEvent.keyDown(button, { key: 'Enter' });
    
    expect(mockOnPress).toHaveBeenCalledWith('test');
  });

  it('applies wide class when wide prop is true', () => {
    render(
      <Key
        id="test"
        label="Test"
        wide={true}
        onPress={mockOnPress}
        secondMode={false}
        alphaMode={false}
      />
    );

    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toHaveClass('col-span-2');
  });

  it('applies tall class when tall prop is true', () => {
    render(
      <Key
        id="test"
        label="Test"
        tall={true}
        onPress={mockOnPress}
        secondMode={false}
        alphaMode={false}
      />
    );

    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toHaveClass('row-span-2');
  });
});
