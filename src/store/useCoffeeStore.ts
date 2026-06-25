import { create } from 'zustand';
import type { CoffeeRecord, DailyCount, ShopStats, FlavorStats } from '../types';
import { STORAGE_KEY, SEED_INITIALIZED_KEY } from '../types';
import { generateSeedData } from './seedData';

interface CoffeeStore {
  records: CoffeeRecord[];
  loading: boolean;
  initialize: () => void;
  addRecord: (record: Omit<CoffeeRecord, 'id' | 'createdAt'>) => void;
  deleteRecord: (id: string) => void;
  getShops: () => string[];
  getBeans: () => string[];
  getDailyCounts: () => DailyCount[];
  getTopShops: (limit?: number) => ShopStats[];
  getFlavorStats: () => FlavorStats[];
}

const loadFromStorage = (): CoffeeRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (records: CoffeeRecord[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

const isSeeded = (): boolean => {
  return localStorage.getItem(SEED_INITIALIZED_KEY) === 'true';
};

const markSeeded = () => {
  localStorage.setItem(SEED_INITIALIZED_KEY, 'true');
};

export const useCoffeeStore = create<CoffeeStore>((set, get) => ({
  records: [],
  loading: true,

  initialize: () => {
    if (!isSeeded()) {
      const seedData = generateSeedData();
      saveToStorage(seedData);
      markSeeded();
      set({ records: seedData, loading: false });
    } else {
      const records = loadFromStorage();
      set({ records, loading: false });
    }
  },

  addRecord: (record) => {
    const newRecord: CoffeeRecord = {
      ...record,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString(),
    };
    const records = [newRecord, ...get().records];
    records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    saveToStorage(records);
    set({ records });
  },

  deleteRecord: (id) => {
    const records = get().records.filter(r => r.id !== id);
    saveToStorage(records);
    set({ records });
  },

  getShops: () => {
    const shops = new Set(get().records.map(r => r.shopName));
    return Array.from(shops).sort();
  },

  getBeans: () => {
    const beans = new Set(get().records.map(r => r.coffeeName));
    return Array.from(beans).sort();
  },

  getDailyCounts: (): DailyCount[] => {
    const counts: Record<string, number> = {};
    get().records.forEach(record => {
      const date = new Date(record.createdAt).toISOString().split('T')[0];
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({ date, count }));
  },

  getTopShops: (limit = 5): ShopStats[] => {
    const counts: Record<string, number> = {};
    get().records.forEach(record => {
      counts[record.shopName] = (counts[record.shopName] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  },

  getFlavorStats: (): FlavorStats[] => {
    const counts: Record<string, number> = {};
    get().records.forEach(record => {
      record.flavors.forEach(flavor => {
        counts[flavor] = (counts[flavor] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  },
}));
