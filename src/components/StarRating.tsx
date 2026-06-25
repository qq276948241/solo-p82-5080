import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

export function StarRating({ rating, onRate, readonly = false, size = 18 }: StarRatingProps) {
  const handleClick = (value: number) => {
    if (!readonly && onRate) {
      onRate(value);
    }
  };

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          disabled={readonly}
          className={`transition-all duration-200 ${!readonly ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
          aria-label={`${star}星`}
        >
          <Star
            size={size}
            className={`transition-all duration-300 ${
              star <= rating
                ? 'fill-latte text-latte'
                : 'fill-transparent text-coffee-light/30'
            }`}
            strokeWidth={2}
          />
        </button>
      ))}
    </div>
  );
}
