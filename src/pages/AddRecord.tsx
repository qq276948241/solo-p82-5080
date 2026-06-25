import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronDown, X } from 'lucide-react';
import { useCoffeeStore } from '../store/useCoffeeStore';
import { StarRating } from '../components/StarRating';
import { FlavorChip } from '../components/FlavorChip';
import { SliderInput } from '../components/SliderInput';
import { FLAVOR_OPTIONS, BREW_METHODS, ROAST_LEVELS, type BrewMethod, type RoastLevel, type Rating } from '../types';

export function AddRecord() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addRecord, getShops, getBeans } = useCoffeeStore();

  const [photo, setPhoto] = useState('');
  const [shopName, setShopName] = useState('');
  const [coffeeName, setCoffeeName] = useState('');
  const [origin, setOrigin] = useState('');
  const [roastLevel, setRoastLevel] = useState<RoastLevel>('中烘');
  const [rating, setRating] = useState<Rating>(4);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [brewMethod, setBrewMethod] = useState<BrewMethod>('手冲');
  const [grams, setGrams] = useState(15);
  const [grindSize, setGrindSize] = useState(5);
  const [temperature, setTemperature] = useState(90);
  const [notes, setNotes] = useState('');
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [showBeanSuggestions, setShowBeanSuggestions] = useState(false);
  const [customShop, setCustomShop] = useState(false);
  const [customBean, setCustomBean] = useState(false);

  const shops = getShops();
  const beans = getBeans();

  const filteredBeans = beans.filter(b =>
    b.toLowerCase().includes(coffeeName.toLowerCase()) && coffeeName.length > 0
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFlavorToggle = (flavor: string) => {
    setSelectedFlavors(prev =>
      prev.includes(flavor)
        ? prev.filter(f => f !== flavor)
        : [...prev, flavor]
    );
  };

  const handleSelectShop = (shop: string) => {
    setShopName(shop);
    setShowShopDropdown(false);
    setCustomShop(false);
  };

  const handleSelectBean = (bean: string) => {
    setCoffeeName(bean);
    setShowBeanSuggestions(false);
    setCustomBean(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!photo) {
      alert('请上传咖啡照片');
      return;
    }
    if (!shopName || !coffeeName) {
      alert('请填写店名和咖啡名');
      return;
    }

    addRecord({
      photo,
      shopName,
      coffeeName,
      origin,
      roastLevel,
      rating,
      flavors: selectedFlavors,
      brewMethod,
      grams,
      grindSize,
      temperature,
      notes,
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen pb-32 bg-cream">
      <header className="sticky top-0 z-10 bg-cream/90 backdrop-blur-md border-b border-coffee-dark/5">
        <div className="container px-4 py-4">
          <h1 className="font-display text-2xl font-bold text-coffee-dark">
            新增记录
          </h1>
          <p className="text-sm text-coffee-light mt-1">
            记录今天的美好
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="container px-4 py-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-coffee-dark mb-2">
            咖啡照片
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative w-full aspect-[4/3] bg-gradient-to-br from-latte-light/30 to-latte/20 rounded-2xl border-2 border-dashed border-latte/40 flex flex-col items-center justify-center cursor-pointer hover:border-latte transition-colors overflow-hidden"
          >
            {photo ? (
              <div className="relative w-full h-full">
                <img src={photo} alt="预览" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhoto('');
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-coffee-dark hover:bg-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <Camera size={48} className="text-latte" />
                <p className="text-sm text-coffee-light">点击上传照片</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 space-y-4">
            <h3 className="font-display font-semibold text-coffee-dark">
              基础信息
            </h3>

            <div className="relative">
              <label className="block text-sm font-medium text-coffee-dark mb-1.5">
                店家
              </label>
              {customShop ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="输入新店名"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-coffee-light/20 bg-cream focus:outline-none focus:border-latte transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => { setCustomShop(false); setShopName(''); }}
                    className="px-3 text-coffee-light"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setShowShopDropdown(!showShopDropdown)}
                    className="w-full px-4 py-2.5 rounded-xl border border-coffee-light/20 bg-cream flex items-center justify-between hover:border-latte transition-colors"
                  >
                    <span className={shopName ? 'text-coffee-dark' : 'text-coffee-light'}>
                      {shopName || '选择或新增店家'}
                    </span>
                    <ChevronDown size={18} className={`text-coffee-light transition-transform ${showShopDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showShopDropdown && (
                    <div className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-lg border border-coffee-light/10 max-h-48 overflow-y-auto">
                      {shops.map(shop => (
                        <button
                          key={shop}
                          type="button"
                          onClick={() => handleSelectShop(shop)}
                          className="w-full px-4 py-2.5 text-left hover:bg-cream text-coffee-dark first:rounded-t-xl last:rounded-b-xl transition-colors"
                        >
                          {shop}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => { setCustomShop(true); setShowShopDropdown(false); }}
                        className="w-full px-4 py-2.5 text-left text-latte-dark hover:bg-cream border-t border-coffee-light/10"
                      >
                        + 新增店家
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-coffee-dark mb-1.5">
                豆子
              </label>
              {customBean ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coffeeName}
                    onChange={(e) => setCoffeeName(e.target.value)}
                    placeholder="输入新豆子名称"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-coffee-light/20 bg-cream focus:outline-none focus:border-latte transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => { setCustomBean(false); setCoffeeName(''); }}
                    className="px-3 text-coffee-light"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={coffeeName}
                    onChange={(e) => {
                      setCoffeeName(e.target.value);
                      setShowBeanSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowBeanSuggestions(coffeeName.length > 0)}
                    placeholder="输入豆子名称"
                    className="w-full px-4 py-2.5 rounded-xl border border-coffee-light/20 bg-cream focus:outline-none focus:border-latte transition-colors"
                  />
                  {showBeanSuggestions && filteredBeans.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-lg border border-coffee-light/10 max-h-48 overflow-y-auto">
                      {filteredBeans.map(bean => (
                        <button
                          key={bean}
                          type="button"
                          onClick={() => handleSelectBean(bean)}
                          className="w-full px-4 py-2.5 text-left hover:bg-cream text-coffee-dark first:rounded-t-xl last:rounded-b-xl transition-colors"
                        >
                          {bean}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => { setCustomBean(true); setShowBeanSuggestions(false); }}
                        className="w-full px-4 py-2.5 text-left text-latte-dark hover:bg-cream border-t border-coffee-light/10"
                      >
                        + 新增豆子
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-dark mb-1.5">
                产地
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="如：埃塞俄比亚"
                className="w-full px-4 py-2.5 rounded-xl border border-coffee-light/20 bg-cream focus:outline-none focus:border-latte transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-dark mb-1.5">
                烘焙度
              </label>
              <div className="flex gap-2 flex-wrap">
                {ROAST_LEVELS.map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setRoastLevel(level)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      roastLevel === level
                        ? 'bg-coffee-dark text-white'
                        : 'bg-cream text-coffee-light hover:bg-latte-light/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 space-y-4">
            <h3 className="font-display font-semibold text-coffee-dark">
              冲煮方式
            </h3>
            <div className="flex gap-3">
              {BREW_METHODS.map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setBrewMethod(method)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    brewMethod === method
                      ? 'bg-latte text-white shadow-md'
                      : 'bg-cream text-coffee-light hover:bg-latte-light/30'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 space-y-5">
            <h3 className="font-display font-semibold text-coffee-dark">
              冲煮参数
            </h3>
            <SliderInput
              label="粉量"
              value={grams}
              min={10}
              max={30}
              unit="g"
              onChange={setGrams}
            />
            <SliderInput
              label="研磨度"
              value={grindSize}
              min={1}
              max={10}
              onChange={setGrindSize}
            />
            <SliderInput
              label="水温"
              value={temperature}
              min={80}
              max={100}
              unit="°C"
              onChange={setTemperature}
            />
          </div>

          <div className="bg-white rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-coffee-dark">
                我的评分
              </h3>
              <StarRating rating={rating} onRate={(r) => setRating(r as Rating)} size={28} />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 space-y-4">
            <h3 className="font-display font-semibold text-coffee-dark">
              风味标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {FLAVOR_OPTIONS.map(flavor => (
                <FlavorChip
                  key={flavor}
                  flavor={flavor}
                  selected={selectedFlavors.includes(flavor)}
                  onClick={() => handleFlavorToggle(flavor)}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 space-y-4">
            <h3 className="font-display font-semibold text-coffee-dark">
              备注
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="记录今天的感受..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-coffee-light/20 bg-cream focus:outline-none focus:border-latte transition-colors resize-none"
            />
          </div>
        </div>
      </form>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-coffee-dark/5">
        <div className="container">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-4 bg-coffee-dark text-white rounded-full font-medium text-lg hover:bg-latte-dark active:scale-[0.98] transition-all duration-200 shadow-lg shadow-coffee-dark/20"
          >
            写完
          </button>
        </div>
      </div>
    </div>
  );
}
