# TI-84 Plus CE Calculator Clone

A beautiful, interactive recreation of the TI-84 Plus CE graphing calculator built with modern web technologies. This is a **frontend-only** application that runs entirely in your browser.

## 🚀 Features

- **Authentic Layout**: Faithful recreation of the TI-84 Plus CE keypad layout
- **Interactive Keys**: All keys are clickable with smooth animations
- **2nd/Alpha Modes**: Toggle modes that change key labels (just like the real calculator)
- **Visual Feedback**: Smooth animations using Framer Motion
- **Graph Display**: Mock quadratic function graph using Recharts
- **Keyboard Support**: Full keyboard shortcuts for desktop use
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Responsive Design**: Works on all screen sizes
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier

## 🎯 Key Features

### Calculator Functionality
- Basic arithmetic operations (+, -, *, /, ^)
- Decimal point support
- Delete and clear functions
- Input history (last 3 calculations)
- Cursor positioning with arrow keys

### Visual Design
- Dark chassis with subtle gradient
- Authentic key colors (blue 2nd, green alpha, gray functions)
- Screen with monospace font
- Soft glare overlay effect
- Responsive key sizing

### Keyboard Shortcuts
- **Digits**: 0-9 keys
- **Operators**: +, -, *, /, . keys
- **Enter**: Enter or = key
- **Delete**: Backspace key
- **Navigation**: Arrow keys
- **2nd Mode**: Shift key
- **Alpha Mode**: CapsLock key

## 📁 Project Structure

```
client/
├── src/
│   ├── components/          # React components
│   │   ├── Calculator.tsx  # Main calculator component
│   │   ├── Screen.tsx      # Display screen with graph
│   │   ├── Keypad.tsx      # Keypad layout
│   │   ├── Key.tsx         # Individual key component
│   │   └── NavPad.tsx      # Navigation pad (arrows + enter)
│   ├── hooks/              # Custom React hooks
│   │   └── useCalculatorState.ts  # Calculator state management
│   ├── lib/                # Utility functions and constants
│   │   ├── layout.ts       # Key layout definitions
│   │   └── keyHandlers.ts  # Key action mappings
│   ├── styles/             # Global styles
│   │   └── globals.css     # Tailwind + custom CSS
│   └── test/               # Test setup
│       └── setup.ts        # Vitest configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khushal06/testrepo.git
   cd testrepo
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## 🧪 Testing

The project includes comprehensive tests for all components and hooks:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage
- Component rendering tests
- User interaction tests
- State management tests
- Accessibility tests
- Keyboard navigation tests

## 🎨 Customization

### Key Layout
Modify `src/lib/layout.ts` to change the calculator layout:

```typescript
export const rows: KeyConfig[][] = [
  [
    { id: 'Y=', label: 'y=', color: 'gray' },
    // ... more keys
  ],
  // ... more rows
];
```

### Key Colors
Available colors: `'default'`, `'blue'`, `'green'`, `'gray'`

### Styling
Customize the appearance in `src/styles/globals.css`:

```css
.key-blue {
  @apply bg-blue-600 text-white hover:bg-blue-500;
}
```

## 🔧 Development

### Adding New Keys
1. Add key configuration to `src/lib/layout.ts`
2. Add handler logic to `src/lib/keyHandlers.ts`
3. Update state management in `src/hooks/useCalculatorState.ts`
4. Add tests for new functionality

### Adding New Modes
1. Extend the `CalculatorState` interface
2. Add mode toggle logic
3. Create alternate label mappings
4. Update UI components to reflect mode changes

## 📱 Responsive Design

The calculator is designed to work on all screen sizes:
- **Desktop**: Full keyboard support and mouse interactions
- **Tablet**: Touch-friendly key sizes
- **Mobile**: Responsive layout with proper spacing

## ♿ Accessibility

- **ARIA Labels**: All interactive elements have proper labels
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Compatible with screen readers
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Meets WCAG guidelines

## 🚀 Performance

- **Lazy Loading**: Components load only when needed
- **Optimized Animations**: Smooth 60fps animations
- **Efficient Re-renders**: Minimal unnecessary re-renders
- **Bundle Optimization**: Tree-shaking and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Texas Instruments for the original TI-84 Plus CE design
- The React and TypeScript communities
- Contributors to the open-source libraries used

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include your browser and OS information

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

*This is a frontend-only application - no backend server required!*
