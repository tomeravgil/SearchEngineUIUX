"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DEMO_RESULTS = [
  { label: "Campus Tours", value: "campus-tours" },
  { label: "Admissions", value: "admissions" },
  { label: "Academic Calendar", value: "academic-calendar" },
  { label: "Student Life", value: "student-life" },
  { label: "Research Opportunities", value: "research" },
  { label: "Athletics", value: "athletics" },
  { label: "Faculty Directory", value: "faculty" },
  { label: "Course Catalog", value: "courses" }
];

export default function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchTerm(query);
      fetchResults(query);
    }
  }, [searchParams]);

  const fetchResults = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/proxy?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to fetch results");
      const data = await response.json();
      setSearchResults(data.suggestions || []);
    } catch (error) {
      console.error("Error fetching results, falling back to demo data:", error);
      // Filter demo results based on the search query to make it more realistic
      const filteredDemoResults = DEMO_RESULTS.filter(result =>
        result.label.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredDemoResults.length > 0 ? filteredDemoResults : DEMO_RESULTS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = (e) => {
    if (e.key === "Enter") {
      setIsFadingOut(true);
      setTimeout(() => {
        router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      }, 300);
    }
  };

  const handleHomeClick = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  return (
    <div className={`min-h-screen bg-card text-card-foreground ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
      <div className="sticky top-0 bg-muted text-muted-foreground  shadow-sm z-10 slide-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <span 
              className="text-red-900 font-bold text-2xl cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleHomeClick}
            >
              RPI
            </span>
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 pr-10 rounded-full border border-gray-200 focus:outline-none focus:border-red-900 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleNewSearch}
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900"></div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="search-card text-muted-foreground rounded-lg p-6 shadow-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a
                  href={`https://rpi.edu/search/${encodeURIComponent(result.value)}`}
                  className="block"
                >
                  <div className="text-xs text-gray-500 mb-1">rpi.edu</div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">
                    {result.label}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Relevant information about {result.label} at Rensselaer Polytechnic Institute...
                  </p>
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}