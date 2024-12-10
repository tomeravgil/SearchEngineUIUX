import { render, screen, fireEvent } from "@testing-library/react";
import SearchHistory from "../history/page";
import Cookies from "js-cookie";

describe("SearchHistory Component", () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });

    // Mock Cookies
    jest.spyOn(Cookies, "get");
    jest.spyOn(Cookies, "set");
    jest.spyOn(Cookies, "remove");

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("renders the initial state with no history or last search", () => {
    window.localStorage.getItem.mockReturnValue(null);
    Cookies.get.mockReturnValue(null);

    render(<SearchHistory />);

    expect(screen.getByText(/last search:/i)).toHaveTextContent("Last Search: None");
    expect(screen.getByText("No search history found.")).toBeInTheDocument();
  });

  it("renders search history from local storage", () => {
    const mockHistory = JSON.stringify([
      { query: "Test Query 1", date: "2024-12-01" },
      { query: "Test Query 2", date: "2024-12-02" },
    ]);
    window.localStorage.getItem.mockReturnValue(mockHistory);

    render(<SearchHistory />);

    expect(screen.getByText(/test query 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test query 2/i)).toBeInTheDocument();
  });

  it("renders last search from cookies", () => {
    const mockLastSearch = JSON.stringify({ query: "Last Test Query", date: "2024-12-03" });
    Cookies.get.mockReturnValue(mockLastSearch);

    render(<SearchHistory />);

    expect(screen.getByText(/last search:/i)).toHaveTextContent("Last Search: Last Test Query (2024-12-03)");
  });

  it('clears local history when "Clear Local History" is clicked', () => {
    render(<SearchHistory />);

    const clearLocalHistoryButton = screen.getByText(/clear local history/i);

    fireEvent.click(clearLocalHistoryButton);

    expect(window.localStorage.removeItem).toHaveBeenCalledWith("searchHistory");
    expect(screen.getByText("No search history found.")).toBeInTheDocument();
  });

  it('clears cookies when "Clear Cookies" is clicked', () => {
    render(<SearchHistory />);

    const clearCookiesButton = screen.getByText(/clear cookies/i);

    fireEvent.click(clearCookiesButton);

    expect(Cookies.remove).toHaveBeenCalledWith("lastSearch");
    expect(screen.getByText(/last search:/i)).toHaveTextContent("Last Search: None");
  });

  it('clears both local history and cookies when "Clear Both" is clicked', () => {
    render(<SearchHistory />);

    const clearBothButton = screen.getByText(/clear both/i);

    fireEvent.click(clearBothButton);

    expect(window.localStorage.removeItem).toHaveBeenCalledWith("searchHistory");
    expect(Cookies.remove).toHaveBeenCalledWith("lastSearch");
    expect(screen.getByText(/last search:/i)).toHaveTextContent("Last Search: None");
    expect(screen.getByText("No search history found.")).toBeInTheDocument();
  });
});
