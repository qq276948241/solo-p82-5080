import { useState, useMemo } from 'react';
import type { CoffeeRecord } from '../types';

interface UseFlavorFilterResult {
  activeTags: string[];
  availableFlavors: string[];
  filteredRecords: CoffeeRecord[];
  toggle: (flavor: string) => void;
  clear: () => void;
}

export function useFlavorFilter(records: CoffeeRecord[]): UseFlavorFilterResult {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const availableFlavors = useMemo(() => {
    const flavorCount: Record<string, number> = {};
    records.forEach(record => {
      record.flavors.forEach(flavor => {
        flavorCount[flavor] = (flavorCount[flavor] || 0) + 1;
      });
    });
    return Object.entries(flavorCount)
      .sort((a, b) => b[1] - a[1])
      .map(([flavor]) => flavor);
  }, [records]);

  const filteredRecords = useMemo(() => {
    if (activeTags.length === 0) return records;
    return records.filter(record =>
      activeTags.every(tag => record.flavors.includes(tag))
    );
  }, [records, activeTags]);

  const toggle = (flavor: string) => {
    setActiveTags(prev =>
      prev.includes(flavor)
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor]
    );
  };

  const clear = () => {
    setActiveTags([]);
  };

  return { activeTags, availableFlavors, filteredRecords, toggle, clear };
}
