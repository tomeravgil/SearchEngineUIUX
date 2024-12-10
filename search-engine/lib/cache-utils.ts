"use client";

function getStorageSize(): string {
  try {
    // Get all localStorage items
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        // Get size in bytes
        totalSize += (localStorage[key].length + key.length) * 2; // Unicode uses 2 bytes per character
      }
    }

    // Convert to appropriate unit
    if (totalSize < 1024) {
      return `${totalSize} B`;
    } else if (totalSize < 1024 * 1024) {
      return `${(totalSize / 1024).toFixed(2)} KB`;
    } else {
      return `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
    }
  } catch (error) {
    console.error('Error calculating storage size:', error);
    return '0 B';
  }
}

export { getStorageSize };