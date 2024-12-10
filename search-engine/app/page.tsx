"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";
import Cookies from "js-cookie";

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [dynamicSuggestions, setDynamicSuggestions] = useState<
    { label: string; value: string }[]
  >([]);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [cookiesEnabled, setCookiesEnabled] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieChoice = localStorage.getItem('cookiesAccepted');
    if (cookieChoice !== null) {
      setShowCookieBanner(false);
      setCookiesEnabled(cookieChoice === 'true');
    }
  }, []);

  // Suggested questions
  const questions = [
    { text: "What is RPI known for?", icon: "🏫" },
    { text: "How do I apply to RPI?", icon: "📄" },
    { text: "What is campus life like at RPI?", icon: "🏠" },
  ];

  const handleSettingsClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      router.push('/settings');
    }, 300);
  };

  const handleSearchClick = (query?: string) => {
    const searchQuery = query || searchInput;
    setIsFadingOut(true);
    saveSearch(searchQuery);
    setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      handleSearchClick();
    }
  };

  const handleAcceptCookies = () => {
    setShowCookieBanner(false);
    setCookiesEnabled(true);
    localStorage.setItem('cookiesAccepted', 'true');
    // Clear any existing cookies to start fresh
    Object.keys(Cookies.get()).forEach(cookie => {
      Cookies.remove(cookie);
    });
  };

  const handleDeclineCookies = () => {
    setShowCookieBanner(false);
    setCookiesEnabled(false);
    localStorage.setItem('cookiesAccepted', 'false');
    // Remove all existing cookies
    Object.keys(Cookies.get()).forEach(cookie => {
      Cookies.remove(cookie);
    });
  };


  const saveSearch = (query: string) => {
    if (!cookiesEnabled) return;
    
    const currentDate = new Date().toLocaleString();
    const existingHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const updatedHistory = [...existingHistory, { query, date: currentDate }];
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    Cookies.set("lastSearch", JSON.stringify({ query, date: currentDate }));
  };

  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === "") return;
      try {
        const response = await fetch(`/api/proxy?query=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Failed to fetch suggestions");
        const data = await response.json();
        setDynamicSuggestions(
          data.suggestions.map((suggestion: string) => ({
            label: suggestion,
            value: suggestion.toLowerCase(),
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(searchInput);
    return () => {
      fetchSuggestions.cancel();
    };
  }, [searchInput, fetchSuggestions]);

  return (
    <div className="min-h-screen relative">
      <div className={`container mx-auto w-1/2 pt-8 pb-24 ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
        <h1 className="text-center mt-8 mb-8 fade-in" style={{ animationDelay: '0.2s' }}>
          <span className="text-primaryRed font-bold text-4xl">RPI</span>
          <span className="text-gray-700 font-normal text-4xl">Search</span>
        </h1>

        <div className="fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex gap-4 justify-center w-full max-w-lg pb-0">
              {questions.map((question, index) => (
                <div
                  key={index}
                  onClick={() => handleSearchClick(question.text)}
                  className="suggestion-card bg-card text-card-foreground shadow-lg flex items-center justify-center rounded-lg w-1/3 h-full p-5 cursor-pointer"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xl mb-2 float-animation">{question.icon}</span>
                    <span className="text-sm">{question.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full border p-3 rounded-full flex flex-row items-center space-x-2 bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <input
                type="text"
                className="w-full h-full focus:outline-none bg-transparent"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="absolute top-4 right-4" onClick={handleSettingsClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 cursor-pointer hover:text-gray-600">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4">
            {searchResults.map((result, index) => (
              <div key={`${result.value}-${index}`} className="group border-2 border-gray-200 bg-gray-50 rounded-lg p-4 shadow-xs transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                <a href={`https://rpi.edu/${result.value}${index + 1}`} className="text-primaryRed transition duration-500 ease-in-out group-hover:text-red-500">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-thin">rpi.edu/{result.value}</span>
                    <span className="text-[10px] font-thin text-gray-400">https://www.rpi.edu/{result.value}</span>
                  </div>
                  <h3 className="font-bold">{result.label}</h3>
                </a>
                <p className="text-sm">Details about {result.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-card text-card-foreground p-4 shadow-lg border-t z-50 fade-in">
          <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center sm:text-left">We use cookies to enhance your experience. Do you wish to accept cookies?</p>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-primaryRed text-white rounded hover:bg-red-700 transition"
                onClick={handleAcceptCookies}
              >
                Accept All
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                onClick={handleDeclineCookies}
              >
                Disable All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}