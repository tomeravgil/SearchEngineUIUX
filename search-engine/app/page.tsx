"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Autocomplete from "@mui/material/Autocomplete"; // Import MUI Autocomplete
import TextField from "@mui/material/TextField"; // For the input field
import logo from "../app/logo.png";
import QueryCard from "@/components/ui/card";
import Cookies from "js-cookie";
import { debounce } from "lodash"; // Install lodash if not already installed

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [dynamicSuggestions, setDynamicSuggestions] = useState<
    { label: string; value: string }[]
  >([]);

  const router = useRouter();

  const saveSearch = (query: string) => {
    const currentDate = new Date().toLocaleString();

    // Save to localStorage with timestamp
    const existingHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const updatedHistory = [...existingHistory, { query, date: currentDate }];
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    // Save to cookies as a JSON string
    Cookies.set("lastSearch", JSON.stringify({ query, date: currentDate }));
  };

  // Debounced fetch function
  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === "") {
        // setDynamicSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`/api/proxy?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }
        const data = await response.json();
        console.log(data);

        setDynamicSuggestions(
          data.suggestions.map((suggestion: string) => ({
            label: suggestion,
            value: suggestion.toLowerCase(),
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }, 300), // 300ms debounce delay
    []
  );

  useEffect(() => {
    console.log(dynamicSuggestions);
  }, [dynamicSuggestions]);

  useEffect(() => {
    fetchSuggestions(searchInput);
    // Clean up the debounce function on unmount
    return () => {
      fetchSuggestions.cancel();
    };
  }, [searchInput, fetchSuggestions]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput.trim()) {
      saveSearch(searchInput);

      // const results = dynamicSuggestions.slice(0, 3);
      setSearchResults(dynamicSuggestions);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black">
      <main className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1/2 flex flex-col items-center gap-4">
        <div className="flex flex-row items-center space-x-4 w-full">
          <div className="flex-shrink-0">
            <Image src={logo} alt="RPI Logo" width={50} height={50} />
          </div>
          <div className="flex-grow">
            {/* MUI Autocomplete Component */}
            <Autocomplete
              options={dynamicSuggestions.map((option) => option.label)} // Use the `label` as the options
              inputValue={searchInput} // Controlled input value
              onInputChange={(event, value) => setSearchInput(value)} // Update `searchInput` state when typing
              onChange={(event, value) => {
                // Update `searchInput` when an option is selected
                if (value) {
                  setSearchInput(value);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search RPI..."
                  variant="outlined"
                  onKeyDown={handleKeyDown} // Handle Enter key
                />
              )}
            />

          </div>
        </div>

        <div className="w-full mt-8 grid grid-cols-1 gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <QueryCard
                key={`${result.value}-${index}`}
                title={`${result.label}${index + 1}`} // Append the index + 1 to the label
                link={`https://rpi.edu/${result.value}${index + 1}`} // Include the index in the link
                description={`Details about ${result.label}${index + 1}`} // Update description
                imageSrc="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">
              Press Enter to search for results.
            </p>
          )}
        </div>


        <button
          onClick={() => router.push("/history")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View Search History
        </button>
      </main>
    </div>
  );
}
