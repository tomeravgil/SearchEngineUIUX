"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import logo from "../app/logo.png";
import QueryCard from "@/components/ui/card";
import Cookies from "js-cookie";

export default function Home() {
  const queries = [
    { label: "Admissions", value: "admissions" },
    { label: "Tuition Fees", value: "tuition" },
    { label: "Campus Map", value: "map" },
    { label: "Library Resources", value: "library" },
    { label: "Courses Offered", value: "courses" },
    { label: "Research Opportunities", value: "research" },
    { label: "Faculty Directory", value: "faculty" },
    { label: "Events Calendar", value: "events" },
    { label: "Student Clubs", value: "clubs" },
    { label: "Dining Services", value: "dining" },
  ];

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput.trim()) {
      saveSearch(searchInput);

      const results = queries
        .filter((query) =>
          query.label.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(0, 3);
      setSearchResults(results);
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
            <Autocomplete
              label="Search RPI..."
              radius="full"
              color="default"
              endContent={null}
              menuTrigger="input"
              onInputChange={(value) => setSearchInput(value)}
              inputProps={{
                onKeyDown: handleKeyDown,
              }}
            >
              {queries.map((query) => (
                <AutocompleteItem key={query.value} value={query.value}>
                  {query.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
        </div>

        <div className="w-full mt-8 grid grid-cols-1 gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <QueryCard
                key={result.value}
                title={result.label}
                link={`https://rpi.edu/${result.value}`}
                description={`Details about ${result.label}`}
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
