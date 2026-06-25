import type { CoffeeRecord, RoastLevel, BrewMethod } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 15);

const coffeePhotos = [
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=artisan%20pour%20over%20coffee%20in%20ceramic%20cup%20on%20wooden%20table%20warm%20lighting%20cozy%20cafe%20atmosphere&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=espresso%20shot%20with%20crema%20in%20small%20white%20cup%20coffee%20bar%20background&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cold%20brew%20coffee%20in%20glass%20with%20ice%20cubes%20minimal%20style&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hand%20pouring%20hot%20water%20over%20coffee%20grounds%20v60%20dripper%20close%20up&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=latte%20art%20heart%20pattern%20in%20white%20coffee%20mug%20on%20marble%20surface&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=single%20origin%20coffee%20beans%20in%20burlap%20sack%20rustic%20style&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coffee%20cupping%20session%20multiple%20glasses%20professional%20tasting&image_size=square',
  'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=aeropress%20coffee%20brewing%20equipment%20on%20wooden%20counter&image_size=square',
];

const shops = [
  'Manner Coffee',
  'Seesaw Coffee',
  'Blue Bottle',
  '% Arabica',
  'Tims',
  '瑞幸咖啡',
  '星巴克',
  'M Stand',
  '皮爷咖啡',
  '隅田川',
];

const coffeeNames = [
  '耶加雪菲',
  '瑰夏',
  '曼特宁',
  '巴西喜拉多',
  '哥伦比亚慧兰',
  '肯尼亚AA',
  '埃塞俄比亚日晒',
  '危地马拉安提瓜',
  '苏门答腊',
  '云南保山',
  '哥斯达黎加',
  '巴拿马翡翠庄园',
];

const origins = [
  '埃塞俄比亚',
  '哥伦比亚',
  '巴西',
  '肯尼亚',
  '危地马拉',
  '印尼曼特宁',
  '中国云南',
  '哥斯达黎加',
  '巴拿马',
  '秘鲁',
];

const roastLevels: RoastLevel[] = ['浅烘', '中浅烘', '中烘', '中深烘', '深烘'];
const brewMethods: BrewMethod[] = ['手冲', '意式', '冷萃'];
const flavorsList = [
  ['橙花', '蜂蜜', '柠檬'],
  ['莓果', '樱桃', '焦糖'],
  ['黑巧', '坚果', '红糖'],
  ['茉莉', '柑橘', '白花'],
  ['榛果', '香草', '奶油'],
  ['蓝莓', '玫瑰', '桃子'],
  ['可可', '肉桂', '杏仁'],
  ['茶感', '焦糖', '牛奶巧'],
  ['苹果', '蜂蜜', '核桃'],
  ['莓果', '黑巧', '榛果'],
];

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  date.setHours(getRandomInt(7, 20), getRandomInt(0, 59), 0, 0);
  return date.toISOString();
};

export const generateSeedData = (): CoffeeRecord[] => {
  const records: CoffeeRecord[] = [];

  for (let i = 0; i < 25; i++) {
    const flavors = getRandomItem(flavorsList);
    const record: CoffeeRecord = {
      id: generateId(),
      photo: getRandomItem(coffeePhotos),
      shopName: getRandomItem(shops),
      coffeeName: getRandomItem(coffeeNames),
      origin: getRandomItem(origins),
      roastLevel: getRandomItem(roastLevels),
      rating: getRandomInt(3, 5) as 1 | 2 | 3 | 4 | 5,
      flavors: [...flavors],
      brewMethod: getRandomItem(brewMethods),
      grams: getRandomInt(12, 20),
      grindSize: getRandomInt(3, 8),
      temperature: getRandomInt(85, 95),
      notes: i % 3 === 0 ? '今天冲煮的口感特别好，风味层次分明' : '',
      createdAt: getRandomDate(30),
    };
    records.push(record);
  }

  records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return records;
};
