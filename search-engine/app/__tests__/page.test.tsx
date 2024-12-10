import { render, screen, fireEvent } from '@testing-library/react';
import Home from "../page";
import { useRouter } from 'next/navigation';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Home Component (page.tsx)', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  it('renders the search input field', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('shows suggestions when typing in the search input', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'RPI' } });

    const suggestion = await screen.findByText('What is RPI known for?');
    expect(suggestion).toBeInTheDocument();
  });
 
  it('hides the cookie banner when "Accept All" is clicked', () => {
    render(<Home />);
    const acceptButton = screen.getByText('Accept All');
    fireEvent.click(acceptButton);

    expect(localStorage.getItem('cookiesAccepted')).toBe('true');
    expect(screen.queryByText('We use cookies to enhance your experience')).not.toBeInTheDocument();
  });
});
