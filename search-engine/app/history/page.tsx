"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

/**
 * A React component that displays the search history and provides options to clear the local history and cookies.
 *
 * @component
 * @example
 * return (
 *   <SearchHistory />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component retrieves the search history from local storage and the last search from cookies.
 * It provides buttons to clear the local history, cookies, or both.
 *
 * @function
 * @name SearchHistory
 *
 * @typedef {Object} SearchEntry
 * @property {string} query - The search query.
 * @property {string} date - The date of the search.
 *
 * @typedef {Object} LastSearch
 * @property {string} query - The last search query.
 * @property {string} date - The date of the last search.
 *
 * @state {SearchEntry[]} history - The array of search history entries.
 * @state {LastSearch | null} lastSearch - The last search entry or null if not available.
 *
 * @hook {useEffect} - Retrieves the search history and last search from local storage and cookies on component mount.
 *
 * @function clearLocalHistory - Clears the search history from local storage and updates the state.
 * @function clearCookies - Clears the last search from cookies and updates the state.
 */
export default function SearchHistory() {
  const [history, setHistory] = useState<{ query: string; date: string }[]>([]);
  const [lastSearch, setLastSearch] = useState<{ query: string; date: string } | null>(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(savedHistory);
  
    try {
      const lastQuery = Cookies.get("lastSearch");
      setLastSearch(lastQuery ? JSON.parse(lastQuery) : null);
    } catch (e) {
      console.error("Error parsing lastSearch cookie:", e);
      setLastSearch(null); // Fallback to null if parsing fails
    }
  }, []);
  

  const clearLocalHistory = () => {
    localStorage.removeItem("searchHistory");
    setHistory([]);
  };

  const clearCookies = () => {
    Cookies.remove("lastSearch");
    setLastSearch(null);
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-2xl font-bold mb-4">Search History</h1>

      <div className="mb-4">
        <p className="text-lg">
          <strong>Last Search:</strong>{" "}
          {lastSearch ? (
            <>
              <span>{lastSearch.query}</span> <span>({lastSearch.date})</span>
            </>
          ) : (
            "None"
          )}
        </p>
      </div>

      <h2 className="text-xl font-semibold mt-4">All Searches:</h2>
      {history.length > 0 ? (
        <ul className="list-disc pl-5">
          {history.map((entry, index) => (
            <li key={index}>
              {entry.query} <span className="text-gray-500">({entry.date})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search history found.</p>
      )}

      <div className="mt-6 flex space-x-4">
        <button
          onClick={clearLocalHistory}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Local History
        </button>
        <button
          onClick={clearCookies}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Clear Cookies
        </button>
        <button
          onClick={() => {
            clearLocalHistory();
            clearCookies();
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Clear Both
        </button>
      </div>
    </div>
  );
}
