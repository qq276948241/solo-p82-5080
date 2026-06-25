export type RoastLevel = '浅烘' | '中浅烘' | '中烘' | '中深烘' | '深烘';
export type BrewMethod = '手冲' | '意式' | '冷萃';
export type Rating = 1 | 2 | 3 | 4 | 5;

export interface CoffeeRecord {
  id: string;
  photo: string;
  shopName: string;
  coffeeName: string;
  origin: string;
  roastLevel: RoastLevel;
  rating: Rating;
  flavors: string[];
  brewMethod: BrewMethod;
  grams: number;
  grindSize: number;
  temperature: number;
  notes: string;
  createdAt: string;
}

export interface ShopStats {
  name: string;
  count: number;
}

export interface FlavorStats {
  name: string;
  count: number;
}

export interface DailyCount {
  date: string;
  count: number;
}

export const FLAVOR_OPTIONS = [
  '橙花', '茉莉', '玫瑰', '莓果', '樱桃', '蓝莓',
  '柑橘', '柠檬', '苹果', '桃子', '蜂蜜', '焦糖',
  '黑巧', '牛奶巧', '坚果', '杏仁', '核桃', '榛果',
  '香草', '奶油', '可可', '肉桂', '红糖', '茶感'
] as const;

export const ROAST_LEVELS: RoastLevel[] = ['浅烘', '中浅烘', '中烘', '中深烘', '深烘'];
export const BREW_METHODS: BrewMethod[] = ['手冲', '意式', '冷萃'];

export const STORAGE_KEY = 'coffee_diary_records';
export const SEED_INITIALIZED_KEY = 'coffee_diary_seeded';
