interface FlavorChipProps {
  flavor: string;
  selected?: boolean;
  onClick?: () => void;
  readonly?: boolean;
  filterMode?: boolean;
}

const flavorColors: Record<string, string> = {
  '橙花': 'bg-orange-100 text-orange-700 border-orange-200',
  '茉莉': 'bg-green-100 text-green-700 border-green-200',
  '玫瑰': 'bg-pink-100 text-pink-700 border-pink-200',
  '莓果': 'bg-red-100 text-red-700 border-red-200',
  '樱桃': 'bg-red-100 text-red-700 border-red-200',
  '蓝莓': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  '柑橘': 'bg-amber-100 text-amber-700 border-amber-200',
  '柠檬': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  '苹果': 'bg-green-100 text-green-700 border-green-200',
  '桃子': 'bg-pink-100 text-pink-700 border-pink-200',
  '蜂蜜': 'bg-amber-100 text-amber-700 border-amber-200',
  '焦糖': 'bg-amber-200 text-amber-800 border-amber-300',
  '黑巧': 'bg-stone-200 text-stone-800 border-stone-300',
  '牛奶巧': 'bg-stone-100 text-stone-700 border-stone-200',
  '坚果': 'bg-amber-100 text-amber-800 border-amber-200',
  '杏仁': 'bg-amber-100 text-amber-700 border-amber-200',
  '核桃': 'bg-amber-200 text-amber-800 border-amber-300',
  '榛果': 'bg-amber-200 text-amber-800 border-amber-300',
  '香草': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  '奶油': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  '可可': 'bg-stone-200 text-stone-700 border-stone-300',
  '肉桂': 'bg-orange-200 text-orange-800 border-orange-300',
  '红糖': 'bg-amber-200 text-amber-800 border-amber-300',
  '茶感': 'bg-green-100 text-green-700 border-green-200',
  '白花': 'bg-gray-100 text-gray-600 border-gray-200',
};

export function FlavorChip({ flavor, selected = false, onClick, readonly = false, filterMode = false }: FlavorChipProps) {
  const baseColor = flavorColors[flavor] || 'bg-latte-light/50 text-coffee-dark border-latte';
  
  const selectedStyle = filterMode
    ? 'bg-latte text-white border-latte shadow-sm animate-bounce-in'
    : `${baseColor} animate-bounce-in`;

  const unselectedStyle = filterMode
    ? 'bg-white text-coffee-light border-coffee-light/30 hover:border-latte hover:text-coffee-medium hover:bg-white'
    : 'bg-white/50 text-coffee-light/70 border-coffee-light/20 hover:bg-white';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={readonly}
      className={`
        px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200
        ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-105'}
        ${selected ? selectedStyle : unselectedStyle}
      `}
    >
      {flavor}
    </button>
  );
}
