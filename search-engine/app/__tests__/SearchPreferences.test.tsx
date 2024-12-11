import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchPreferencesPage from '../settings/search-preferences/page';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
  };
})();

global.localStorage = localStorageMock;

describe('SearchPreferencesPage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<SearchPreferencesPage />);
    expect(screen.getByText('Search Settings')).toBeInTheDocument();
  });

  it('loads initial preferences from localStorage', () => {
    localStorageMock.setItem('safeSearch', 'false');
    localStorageMock.setItem('prioRecent', 'true');
    localStorageMock.setItem('resultsPerPage', '20');

    render(<SearchPreferencesPage />);

    expect(screen.getByLabelText('Safe Search')).not.toBeChecked();
    expect(screen.getByLabelText('Prioritize Recent Content')).toBeChecked();
    expect(screen.getByLabelText('Results per page')).toHaveDisplayValue('20');
  });

  it('toggles safe search preference', () => {
    render(<SearchPreferencesPage />);
    const toggle = screen.getByLabelText('Safe Search');

    expect(toggle).toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('safeSearch', 'false');
  });

  it('toggles prioritize recent content preference', () => {
    render(<SearchPreferencesPage />);
    const toggle = screen.getByLabelText('Prioritize Recent Content');

    expect(toggle).toBeChecked();
    fireEvent.click(toggle);
    expect(toggle).not.toBeChecked();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('prioRecent', 'false');
  });

  it('changes results per page preference', () => {
    render(<SearchPreferencesPage />);
    const select = screen.getByLabelText('Results per page');

    fireEvent.change(select, { target: { value: '30' } });
    expect(select).toHaveDisplayValue('30');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('resultsPerPage', '30');
  });
});
