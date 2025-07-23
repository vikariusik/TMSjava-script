import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../context/ThemeContext';
import Title from '../components/Title';

describe('Title Component', () => {
  it('renders title with correct text', () => {
    const titleText = 'Test Title';
    
    render(
      <ThemeProvider>
        <Title text={titleText} />
      </ThemeProvider>
    );
    
    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('renders as h1 element', () => {
    const titleText = 'Test Title';
    
    render(
      <ThemeProvider>
        <Title text={titleText} />
      </ThemeProvider>
    );
    
    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(titleText);
  });
});
