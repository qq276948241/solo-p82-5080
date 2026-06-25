import { MapPin, Coffee } from 'lucide-react';
import type { CoffeeRecord } from '../types';
import { StarRating } from './StarRating';
import { FlavorChip } from './FlavorChip';

interface CoffeeCardProps {
  record: CoffeeRecord;
  index: number;
  onDelete?: (id: string) => void;
}

export function CoffeeCard({ record, index, onDelete }: CoffeeCardProps) {
  const date = new Date(record.createdAt);
  const formattedDate = date.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
  const formattedTime = date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className="bg-white rounded-2xl shadow-lg shadow-coffee-dark/5 overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex">
        <div className="w-1/3 relative">
          <img
            src={record.photo}
            alt={record.coffeeName}
            className="w-full h-full object-cover aspect-square"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-coffee-dark">
              {record.brewMethod}
            </span>
          </div>
        </div>

        <div className="w-2/3 p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1 text-xs text-coffee-light">
              <MapPin size={12} />
              <span>{record.shopName}</span>
            </div>
            <StarRating rating={record.rating} readonly size={14} />
          </div>

          <div>
            <h3 className="font-display font-semibold text-coffee-dark text-base leading-tight">
              {record.coffeeName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Coffee size={12} className="text-latte" />
              <span className="text-xs text-coffee-light">
                {record.origin} · {record.roastLevel}
              </span>
            </div>
          </div>

          <div className="flex gap-4 text-xs text-coffee-light">
            <span>{record.grams}g</span>
            <span>研磨 {record.grindSize}</span>
            <span>{record.temperature}°C</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {record.flavors.slice(0, 4).map((flavor) => (
              <FlavorChip key={flavor} flavor={flavor} selected readonly />
            ))}
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-coffee-light/10">
            <span className="text-xs text-coffee-light/70">
              {formattedDate} {formattedTime}
            </span>
            {onDelete && (
              <button
              onClick={() => onDelete(record.id)}
              className="text-xs text-red-400 hover:text-red-500 transition-colors"
            >
              删除
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
