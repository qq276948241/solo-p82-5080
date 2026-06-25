import { useState, useMemo } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChevronLeft, ChevronRight, Coffee } from 'lucide-react';
import { useCoffeeStore } from '../store/useCoffeeStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

function getHeatmapColor(count: number, maxCount: number): string {
  if (count === 0) return 'bg-coffee-light/5';
  const ratio = count / maxCount;
  if (ratio <= 0.25) return 'bg-latte-light/40';
  if (ratio <= 0.5) return 'bg-latte-light/70';
  if (ratio <= 0.75) return 'bg-latte';
  return 'bg-coffee-dark';
}

function getHeatmapTextColor(count: number, maxCount: number): string {
  if (count === 0) return 'text-coffee-light/30';
  const ratio = count / maxCount;
  return ratio > 0.5 ? 'text-white' : 'text-coffee-dark';
}

export function Statistics() {
  const { records, loading, getTopShops, getFlavorStats, getDailyCounts } = useCoffeeStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const dailyCounts = useMemo(() => {
    const counts = getDailyCounts();
    const map: Record<string, number> = {};
    counts.forEach(d => { map[d.date] = d.count; });
    return map;
  }, [getDailyCounts]);

  const topShops = useMemo(() => getTopShops(5), [getTopShops]);
  const flavorStats = useMemo(() => getFlavorStats().slice(0, 6), [getFlavorStats]);

  const maxDailyCount = useMemo(() => {
    const counts = Object.values(dailyCounts);
    return counts.length > 0 ? Math.max(...counts) : 1;
  }, [dailyCounts]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Array<{ date: string | null; day: number | null; count: number }> = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ date: null, day: null, count: 0 });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i).toISOString().split('T')[0];
      days.push({ date, day: i, count: dailyCounts[date] || 0 });
    }

    return days;
  }, [currentMonth, dailyCounts]);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const barData = {
    labels: topShops.map(s => s.name.length > 4 ? s.name.slice(0, 4) + '...' : s.name),
    datasets: [
      {
        label: '饮用次数',
        data: topShops.map(s => s.count),
        backgroundColor: '#D7A86E',
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: '#8D6E63' },
        grid: { color: 'rgba(141, 110, 99, 0.1)' },
      },
      y: {
        ticks: { color: '#3E2723', font: { size: 12 } },
        grid: { display: false },
      },
    },
  };

  const radarData = {
    labels: flavorStats.map(f => f.name),
    datasets: [
      {
        label: '风味偏好',
        data: flavorStats.map(f => f.count),
        backgroundColor: 'rgba(139, 168, 136, 0.3)',
        borderColor: '#8BA888',
        borderWidth: 2,
        pointBackgroundColor: '#8BA888',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#8BA888',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: { display: false },
        grid: { color: 'rgba(62, 39, 35, 0.1)' },
        angleLines: { color: 'rgba(62, 39, 35, 0.1)' },
        pointLabels: {
          color: '#3E2723',
          font: { size: 12 },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Coffee size={48} className="text-latte animate-pulse-soft mx-auto" />
          <p className="text-coffee-light">正在加载统计数据...</p>
        </div>
      </div>
    );
  }

  const totalCups = records.length;
  const avgRating = records.length > 0
    ? (records.reduce((sum, r) => sum + r.rating, 0) / records.length).toFixed(1)
    : '0';
  const uniqueShops = new Set(records.map(r => r.shopName)).size;

  return (
    <div className="min-h-screen pb-24 bg-cream">
      <header className="sticky top-0 z-10 bg-cream/90 backdrop-blur-md border-b border-coffee-dark/5">
        <div className="container px-4 py-4">
          <h1 className="font-display text-2xl font-bold text-coffee-dark">
            咖啡统计
          </h1>
          <p className="text-sm text-coffee-light mt-1">
            发现你的口味偏好
          </p>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 text-center animate-fade-in" style={{ animationDelay: '0.05s' }}>
            <p className="text-2xl font-bold text-coffee-dark">{totalCups}</p>
            <p className="text-xs text-coffee-light mt-1">总杯数</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <p className="text-2xl font-bold text-latte-dark">{avgRating}</p>
            <p className="text-xs text-coffee-light mt-1">平均评分</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <p className="text-2xl font-bold text-matcha-dark">{uniqueShops}</p>
            <p className="text-xs text-coffee-light mt-1">探索店铺</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-coffee-dark">
              月历热力图
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                className="p-1.5 hover:bg-cream rounded-lg transition-colors"
              >
                <ChevronLeft size={18} className="text-coffee-light" />
              </button>
              <span className="text-sm font-medium text-coffee-dark min-w-[100px] text-center">
                {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
              </span>
              <button
                onClick={nextMonth}
                className="p-1.5 hover:bg-cream rounded-lg transition-colors"
              >
                <ChevronRight size={18} className="text-coffee-light" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {WEEKDAYS.map(day => (
              <div key={day} className="text-center text-xs text-coffee-light font-medium py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-xs font-medium
                  transition-all duration-200
                  ${day.date 
                    ? `${getHeatmapColor(day.count, maxDailyCount)} ${getHeatmapTextColor(day.count, maxDailyCount)} hover:scale-105` 
                    : 'bg-transparent'
                  }
                `}
                title={day.date ? `${day.date}: ${day.count}杯` : ''}
              >
                {day.day}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-xs text-coffee-light">少</span>
            <div className="flex gap-1">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded ${getHeatmapColor(Math.ceil(ratio * maxDailyCount), maxDailyCount)}`}
                />
              ))}
            </div>
            <span className="text-xs text-coffee-light">多</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <h3 className="font-display font-semibold text-coffee-dark mb-4">
              常去店铺 TOP5
            </h3>
            <div className="h-64">
              {topShops.length > 0 ? (
                <Bar data={barData} options={barOptions} />
              ) : (
                <div className="h-full flex items-center justify-center text-coffee-light">
                  暂无数据
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-display font-semibold text-coffee-dark mb-4">
              风味偏好雷达
            </h3>
            <div className="h-64">
              {flavorStats.length >= 3 ? (
                <Radar data={radarData} options={radarOptions} />
              ) : (
                <div className="h-full flex items-center justify-center text-coffee-light">
                  需要更多数据
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
