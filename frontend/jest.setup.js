// frontend/jest.setup.js
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

configure({
  asyncUtilTimeout: 5000,
});

// Suppress specific warnings
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    args[0]?.includes('Warning: ReactDOM.render is no longer supported') ||
    args[0]?.includes('punycode') ||
    args[0]?.includes('React.act')
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};