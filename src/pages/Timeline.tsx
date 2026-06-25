import { Plus, Coffee as CoffeeIcon, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCoffeeStore } from '../store/useCoffeeStore';
import { useFlavorFilter } from '../hooks/useFlavorFilter';
import { CoffeeCard } from '../components/CoffeeCard';
import { FlavorChip } from '../components/FlavorChip';

export function Timeline() {
  const navigate = useNavigate();
  const { records, loading, deleteRecord } = useCoffeeStore();
  const { activeTags, availableFlavors, filteredRecords, toggle, clear } = useFlavorFilter(records);

  const handleAdd = () => {
    navigate('/add');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <CoffeeIcon size={48} className="text-latte animate-pulse-soft mx-auto" />
          <p className="text-coffee-light">正在加载咖啡日记...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-10 bg-cream/90 backdrop-blur-md border-b border-coffee-dark/5">
        <div className="container px-4 py-4">
          <h1 className="font-display text-2xl font-bold text-coffee-dark">
            咖啡日记
          </h1>
          <p className="text-sm text-coffee-light mt-1">
            记录每一杯的美好时光
          </p>

          {availableFlavors.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-coffee-light flex-shrink-0" />
                <span className="text-xs text-coffee-light font-medium">风味筛选</span>
                {activeTags.length > 0 && (
                  <button
                    onClick={clear}
                    className="ml-auto flex items-center gap-1 text-xs text-latte-dark hover:text-coffee-dark transition-colors"
                  >
                    <X size={12} />
                    清除
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {availableFlavors.map(flavor => (
                  <FlavorChip
                    key={flavor}
                    flavor={flavor}
                    selected={activeTags.includes(flavor)}
                    onClick={() => toggle(flavor)}
                    filterMode
                  />
                ))}
              </div>
              {activeTags.length > 0 && (
                <p className="text-xs text-coffee-light/70">
                  已筛选 {activeTags.length} 种风味 · 匹配 {filteredRecords.length} 条记录
                </p>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="container px-4 py-6">
        {records.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <CoffeeIcon size={64} className="text-coffee-light/30 mx-auto" />
            <h2 className="font-display text-xl text-coffee-dark">还没有记录</h2>
            <p className="text-coffee-light">点击右下角按钮开始记录你的第一杯咖啡</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <CoffeeIcon size={64} className="text-coffee-light/30 mx-auto" />
            <h2 className="font-display text-xl text-coffee-dark">没有匹配的记录</h2>
            <p className="text-coffee-light">尝试减少筛选条件</p>
            <button
              onClick={clear}
              className="px-4 py-2 bg-latte text-white rounded-full text-sm font-medium hover:bg-latte-dark transition-colors"
            >
              清除筛选
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record, index) => (
              <CoffeeCard
                key={record.id}
                record={record}
                index={index}
                onDelete={deleteRecord}
              />
            ))}
          </div>
        )}
      </main>

      <button
        onClick={handleAdd}
        className="fixed right-5 bottom-24 z-30 flex items-center gap-2 px-5 py-3 bg-coffee-dark text-white rounded-full shadow-lg shadow-coffee-dark/30 hover:bg-latte-dark hover:shadow-latte-dark/30 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <Plus size={20} />
        <span className="font-medium">今天喝了吗</span>
      </button>
    </div>
  );
}
