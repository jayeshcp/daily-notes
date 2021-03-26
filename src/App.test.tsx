import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders notes in page title', () => {
  render(<App />);
  const linkElement = screen.getByText(/notes/i);
  expect(linkElement).toBeInTheDocument();
});
