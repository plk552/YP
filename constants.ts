import { Equipment, EquipmentCategory, Package, Purpose } from './types';

export const EQUIPMENT_CATALOG: Equipment[] = [
  // Cameras
  { id: 'c1', name: 'Sony A7 IV', category: EquipmentCategory.Camera, pricePerDay: 3500, image: 'https://dw.kz/upload/iblock/736/736d9ffefb386036c43bac5409287820.jpg', description: 'Гибридная камера 33МП, 4K 60p' },
  { id: 'c2', name: 'Sony FX3', category: EquipmentCategory.Camera, pricePerDay: 5500, image: 'https://ir.ozone.ru/s3/multimedia-1-1/c1000/7286068657.jpg', description: 'Кинокамера с активным охлаждением' },
  { id: 'c3', name: 'Canon R5', category: EquipmentCategory.Camera, pricePerDay: 4500, image: 'https://avatars.mds.yandex.net/get-mpic/12411215/2a000001930137a224a80a209cade59387b5/orig', description: '8K RAW, 45МП фото' },
  { id: 'c4', name: 'iPhone 15 Pro Max', category: EquipmentCategory.Camera, pricePerDay: 2000, image: 'https://avatars.mds.yandex.net/i?id=2f328f0d3927ac11d5404d433fc1f6daf61acbe3-10448622-images-thumbs&n=13', description: 'ProRes Log запись' },
  { id: 'c5', name: 'Blackmagic 6K Pro', category: EquipmentCategory.Camera, pricePerDay: 4000, image: 'https://resources.cdn-kaspi.kz/img/m/p/hd1/h30/64095522652190.jpg?format=gallery-large', description: 'Кинематографическое качество RAW' },
  { id: 'c6', name: 'RED Komodo 6K', category: EquipmentCategory.Camera, pricePerDay: 12000, image: 'https://avatars.mds.yandex.net/get-mpic/11858961/2a000001965eee61ea4754d96a97543ddddf/9hq', description: 'Компактная кинокамера Global Shutter' },

  // Lenses
  { id: 'l1', name: 'Sony 24-70mm GM II', category: EquipmentCategory.Lens, pricePerDay: 2500, image: 'https://avatars.mds.yandex.net/get-mpic/4412310/img_id810997337450208669.jpeg/orig', description: 'Универсальный зум G Master' },
  { id: 'l2', name: 'Canon RF 15-35mm', category: EquipmentCategory.Lens, pricePerDay: 2300, image: 'https://main-cdn.sbermegamarket.ru/big2/hlr-system/-20/923/578/655/281/036/100043693048b7.png', description: 'Широкоугольный L-объектив' },
  { id: 'l3', name: 'Sony 85mm f/1.4 GM', category: EquipmentCategory.Lens, pricePerDay: 2000, image: 'https://avatars.mds.yandex.net/get-mpic/4907979/img_id4926847177203803750.jpeg/orig', description: 'Идеальный портретник' },
  { id: 'l4', name: 'Sigma 18-35mm Art', category: EquipmentCategory.Lens, pricePerDay: 1500, image: 'https://avatars.mds.yandex.net/get-mpic/11482776/2a0000018bfce605f645826ea4b9de6ba335/orig', description: 'Светосильный зум f/1.8' },

  // Audio
  { id: 'a1', name: 'DJI Mic 2 (2TX)', category: EquipmentCategory.Audio, pricePerDay: 1500, image: 'https://avatars.mds.yandex.net/get-mpic/12523877/2a0000018ee78095b03c063d9759990ba303/orig', description: 'Беспроводная система 32-bit float' },
  { id: 'a2', name: 'Rode VideoMic Pro+', category: EquipmentCategory.Audio, pricePerDay: 900, image: 'https://cdn1.ozone.ru/s3/multimedia-1-e/c600/7149703190.jpg', description: 'Накамерная пушка' },
  { id: 'a3', name: 'Zoom H6', category: EquipmentCategory.Audio, pricePerDay: 1200, image: 'https://lightphotos.ru/image/full/data/aaa/zoom/H6-1.jpg', description: 'Рекордер 6 каналов' },

  // Light
  { id: 'li1', name: 'Godox SL60W', category: EquipmentCategory.Light, pricePerDay: 800, image: 'https://avatars.mds.yandex.net/get-mpic/17022999/2a00000199140425c7d4bc9157397baf739b/orig', description: 'Постоянный студийный свет' },
  { id: 'li2', name: 'Aputure MC RGB', category: EquipmentCategory.Light, pricePerDay: 500, image: 'https://avatars.mds.yandex.net/get-mpic/5229821/2a00000191e30bb6b14db30f67ebe29331ff/orig', description: 'Карманная RGB панель' },
  { id: 'li3', name: 'Ring Light Pro', category: EquipmentCategory.Light, pricePerDay: 600, image: 'https://lumecube.com/cdn/shop/files/cordless-ring-light-pro-led-with-tripod-stand-lume-cube.jpg?v=1746204631&width=1024', description: 'Кольцевая лампа 18 дюймов' },
  { id: 'li4', name: 'Aputure 300d II', category: EquipmentCategory.Light, pricePerDay: 2500, image: 'https://avatars.mds.yandex.net/get-mpic/5236045/2a00000194bcfb30c2a883633ca1078fb7f2/orig', description: 'Мощный прожектор' },
  { id: 'li5', name: 'Astera Titan Tube', category: EquipmentCategory.Light, pricePerDay: 3000, image: 'https://microless.com/cdn/products/2b53c66832d748c0cac52633a02eeaff-hi.jpg', description: 'RGB трубка для киносвета' },

  // Stabilizers
  { id: 's1', name: 'DJI RS 3 Pro', category: EquipmentCategory.Stabilizer, pricePerDay: 2500, image: 'https://cdn1.ozone.ru/s3/multimedia-1-u/7462789770.jpg', description: 'Профессиональный гимбал' },
  { id: 's2', name: 'Insta360 Flow', category: EquipmentCategory.Stabilizer, pricePerDay: 800, image: 'https://avatars.mds.yandex.net/get-mpic/15229008/2a00000196f334c9dc730251eb3333c30407/orig', description: 'Смартфонный стабилизатор с ИИ' },
  { id: 's3', name: 'EasyRig Vario 5', category: EquipmentCategory.Stabilizer, pricePerDay: 4000, image: 'https://фотозум.рф/upload/iblock/578/9sdjo9zm966qnyz9zqeyshao3kvf3pim.webp', description: 'Жилет для разгрузки спины' },

  // Drones & Action
  { id: 'd1', name: 'DJI Mavic 3 Cine', category: EquipmentCategory.Drone, pricePerDay: 4500, image: 'https://dji-rus.com/images/detailed/372/1871ebe4f6ce111c440bc3486ef1549d.jpg', description: '5.1K Video, Apple ProRes' },
  { id: 'd2', name: 'DJI Mini 3 Pro', category: EquipmentCategory.Drone, pricePerDay: 2000, image: 'https://2cent.ru/storage/photo/resized/xy_1500x1500/e/vo67014wh5ymg1s_694520b8.jpg.webp', description: 'Легкий дрон, вертикальная съемка' },
  { id: 'd3', name: 'DJI Inspire 3', category: EquipmentCategory.Drone, pricePerDay: 15000, image: 'https://mydrone.ru/images/thumbnails/1100/900/detailed/125/dji-inspire-3-01.jpg', description: 'Кинодрон 8K RAW' },
  { id: 'ac1', name: 'GoPro Hero 12', category: EquipmentCategory.Action, pricePerDay: 1500, image: 'https://media.komus.ru/medias/sys_master/product-images/product-images/h65/h60/13922102083614/1976154-1-800Wx800H.jpg', description: 'Экшн камера, HyperSmooth 6.0' }
];

export const PRESET_PACKAGES: Package[] = [
  // TikTok Packages
  {
    id: 'tk1',
    title: 'Тикток Старт',
    description: 'Идеально для начинающих блогеров.',
    purpose: Purpose.TikTok,
    items: ['c4', 'li3', 'a2'], 
    discountedPrice: 2900,
    features: ['Мобильная съемка', 'Кольцевой свет', 'Накамерный микрофон'],
    isPopular: true
  },
  {
    id: 'tk2',
    title: 'Тикток PRO',
    description: 'Для качественного контента и стримов.',
    purpose: Purpose.TikTok,
    items: ['c1', 'l1', 'a1', 'li2'],
    discountedPrice: 7500,
    features: ['Полнокадровая камера', 'Петличная система', 'RGB свет для фона']
  },
  {
    id: 'tk3',
    title: 'Тикток Максимум',
    description: 'Полный набор для профессионального блоггинга.',
    purpose: Purpose.TikTok,
    items: ['c1', 'l4', 'a1', 'li2', 'li3', 's2'],
    discountedPrice: 9500,
    features: ['Sony A7 IV', 'Два источника света', 'Стабилизация и звук']
  },
  
  // YouTube Packages
  {
    id: 'yt1',
    title: 'Ютуб Интервью',
    description: 'Комплект для записи подкастов и интервью.',
    purpose: Purpose.YouTube,
    items: ['c1', 'c3', 'l1', 'l2', 'a1', 'li1'],
    discountedPrice: 12000,
    features: ['Две камеры', 'Два объектива', 'Студийный свет'],
    isPopular: true
  },
  {
    id: 'yt2',
    title: 'Ютуб Влог',
    description: 'Легкий сетап для съемки в движении.',
    purpose: Purpose.YouTube,
    items: ['c2', 'l1', 'a1', 's1'],
    discountedPrice: 9900,
    features: ['Кинокамера FX3', 'Стабилизатор', 'Беспроводной звук']
  },
  {
    id: 'yt3',
    title: 'Ютуб Студия',
    description: 'Стационарный комплект для студийной съемки.',
    purpose: Purpose.YouTube,
    items: ['c2', 'c2', 'l1', 'l1', 'a3', 'li4', 'li4'],
    discountedPrice: 25000,
    features: ['Две FX3 камеры', 'Два мощных источника', 'Рекордер Zoom']
  },

  // Wedding Packages
  {
    id: 'wd1',
    title: 'Свадьба Фото',
    description: 'Базовый набор свадебного фотографа.',
    purpose: Purpose.Wedding,
    items: ['c1', 'l1', 'li1'],
    discountedPrice: 6500,
    features: ['Надежная камера', 'Универсальный зум', 'Вспышка/Свет'],
    isPopular: true
  },
  {
    id: 'wd2',
    title: 'Свадьба Видео',
    description: 'Полный набор для видео команды.',
    purpose: Purpose.Wedding,
    items: ['c2', 'l1', 's1', 'a3', 'li2'],
    discountedPrice: 11000,
    features: ['Cinema Line камера', 'Стабилизатор', 'Художественный свет']
  },
  {
    id: 'wd3',
    title: 'Свадьба Люкс',
    description: 'Максимальное качество для важных моментов.',
    purpose: Purpose.Wedding,
    items: ['c3', 'c1', 'l1', 'l3', 's1', 'li2', 'd2'],
    discountedPrice: 18000,
    features: ['Canon R5 + Sony A7', 'Портретная оптика', 'Дрон для общих планов']
  },

  // Commercial
  {
    id: 'cm1',
    title: 'Реклама База',
    description: 'Для съемки товаров и каталогов.',
    purpose: Purpose.Commercial,
    items: ['c3', 'l1', 'li4', 'li1'],
    discountedPrice: 8500,
    features: ['Высокое разрешение', 'Мощный свет', 'Макро возможности']
  },
  {
    id: 'cm2',
    title: 'Синема Продакшн',
    description: 'Для клипов и имиджевых роликов.',
    purpose: Purpose.Commercial,
    items: ['c5', 'l2', 's1', 'd1', 'li4'],
    discountedPrice: 15000,
    features: ['Blackmagic RAW', 'Дрон Mavic 3', 'Свет Aputure']
  },
  {
    id: 'cm3',
    title: 'Реклама PRO',
    description: 'Бескомпромиссное качество картинки.',
    purpose: Purpose.Commercial,
    items: ['c6', 'l1', 'l2', 'li4', 'li5', 's1'],
    discountedPrice: 22000,
    features: ['RED Komodo 6K', 'Полный комплект света', 'Профессиональный стаб']
  },

  // Travel
  {
    id: 'tr1',
    title: 'Travel Light',
    description: 'Всё поместится в один рюкзак.',
    purpose: Purpose.Travel,
    items: ['d2', 'ac1', 's2'],
    discountedPrice: 4000,
    features: ['Дрон Mini 3', 'GoPro', 'Стаб для телефона']
  },
  {
    id: 'tr2',
    title: 'Travel Cinema',
    description: 'Кинокачество в путешествии.',
    purpose: Purpose.Travel,
    items: ['c2', 'l1', 'd1', 'a1'],
    discountedPrice: 12500,
    features: ['FX3', 'Mavic 3 Cine', 'Звук DJI']
  },
  {
    id: 'tr3',
    title: 'Travel Adventure',
    description: 'Для экстремальных условий.',
    purpose: Purpose.Travel,
    items: ['ac1', 'ac1', 'd2', 's2', 'li2'],
    discountedPrice: 6000,
    features: ['Две экшн-камеры', 'Защищенный дрон', 'Компактный свет']
  },

  // Cinema (New)
  {
    id: 'cn1',
    title: 'Hollywood Starter',
    description: 'Входной билет в большое кино.',
    purpose: Purpose.Cinema,
    items: ['c6', 'l4', 's3', 'd3'],
    discountedPrice: 35000,
    features: ['RED Komodo', 'EasyRig', 'Inspire 3'],
    isPopular: true
  },

  // Events (New)
  {
    id: 'ev1',
    title: 'Репортаж PRO',
    description: 'Для съемки концертов и мероприятий.',
    purpose: Purpose.Event,
    items: ['c1', 'l1', 'l3', 'li1'],
    discountedPrice: 8000,
    features: ['Светосильная оптика', 'Вспышка', 'Автофокус']
  }
];