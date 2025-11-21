import { useEffect, useState } from 'react';
import type { FilterCondition } from '../types';

const STORAGE_KEY = 'dynamic-filter-system-filters';

/**
 * Custom hook for persisting filters to localStorage
 * Automatically saves and restores filter state
 */
export function useFilterPersistence() {
  const [filters, setFilters] = useState<FilterCondition[]>(() => {
    // Load from localStorage on mount
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as FilterCondition[];
      }
    } catch (error) {
      console.error('Failed to load filters from localStorage:', error);
    }
    return [];
  });

  // Save to localStorage whenever filters change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch (error) {
      console.error('Failed to save filters to localStorage:', error);
    }
  }, [filters]);

  const clearPersistedFilters = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFilters([]);
    } catch (error) {
      console.error('Failed to clear filters from localStorage:', error);
    }
  };

  return {
    filters,
    setFilters,
    clearPersistedFilters,
  };
}
