"use client";

import { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStorageSize } from '@/lib/cache-utils';

interface SearchHistoryItem {
  id: number;
  query: string;
  date: string;
  url: string;  // Added URL to the interface
}

export default function BrowsingHistoryPage() {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [cachedDataSize, setCachedDataSize] = useState('0 B');

  useEffect(() => {
    loadSearchHistory();
    updateCacheSize();
  }, []);
  const updateCacheSize = () => {
    const size = getStorageSize();
    setCachedDataSize(size);
  };

  const loadSearchHistory = () => {
    try {
      const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
      const formattedHistory: SearchHistoryItem[] = history.map((item: any, index: number) => ({
        id: index + 1,
        query: item.query,
        date: item.date,
        url: `https://rpi.edu/search?q=${encodeURIComponent(item.query)}`
      }));
      setSearchHistory(formattedHistory);
      updateCacheSize(); // Update cache size after loading history
    } catch (error) {
      console.error('Error loading search history:', error);
      setSearchHistory([]);
    }
  };

  const clearAllHistory = () => {
    localStorage.removeItem('searchHistory');
    setSearchHistory([]);
    setSelectedItems(new Set());
    updateCacheSize();
  };

  const deleteSelectedItems = () => {
    const updatedHistory = searchHistory.filter(item => !selectedItems.has(item.id));
    const historyForStorage = updatedHistory.map(({ query, date }) => ({ query, date }));
    localStorage.setItem('searchHistory', JSON.stringify(historyForStorage));
    setSearchHistory(updatedHistory);
    setSelectedItems(new Set());
    updateCacheSize(); 
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(searchHistory.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const toggleSelectItem = (id: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const isAllSelected = searchHistory.length > 0 && selectedItems.size === searchHistory.length;

  return (
    <div className="space-y-6">
      <div className="border-2 rounded-lg p-4 bg-background text-foreground flex flex-row justify-between items-center">
        <h3 className="font-medium">Current Cached Data</h3>
        <p className="text-gray-600">{cachedDataSize}</p>
      </div>

      <div className="border-2 rounded-lg p-4 bg-background text-foreground flex flex-row justify-between items-center">
        <h3 className="font-medium">Clear Browsing Data</h3>
        <AlertDialog>
          <AlertDialogTrigger className="px-4 py-2 bg-primaryRed text-white rounded-lg hover:bg-red-700 transition-colors">
            Clear Data
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear all browsing data?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your browsing history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={clearAllHistory}>
                Clear All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="border-2 rounded-lg p-4 bg-background text-foreground">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Recent Browsing History</h3>
          {selectedItems.size > 0 && (
            <div className="flex space-x-2">
              <button 
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
                onClick={deleteSelectedItems}
              >
                Delete Selected ({selectedItems.size})
              </button>
            </div>
          )}
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={isAllSelected}
                  onCheckedChange={(checked) => toggleSelectAll(checked as boolean)}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[40%]">Search Query</TableHead>
              <TableHead className="w-[40%]">URL</TableHead>
              <TableHead className="w-[20%]">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-12">
                  <Checkbox 
                    checked={selectedItems.has(item.id)}
                    onCheckedChange={() => toggleSelectItem(item.id)}
                    aria-label={`Select ${item.query}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.query}</TableCell>
                <TableCell className="text-blue-600 hover:underline">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                </TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            ))}
            {searchHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                  No search history available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}